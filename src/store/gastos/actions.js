/*
export const someAction = (state) => {
}
*/
import uuid from '../../plugins/uuid'
import { unicosStore, mensaisStore, cartaoStore } from '../../persistence/gastos'

export const carregar = ({ state }, { data }) => {
  state.unicos = []
  state.cartao = []
  const id = `${data.ano}-${data.mes}`
  return Promise.all([
    unicosStore.getItem(id),
    new Promise(async (resolve) => {
      const gastosMes = await mensaisStore.getItem(id) || []
      let gastos = await mensaisStore.getItem('gastos') || []
      gastos = gastos.filter(g => {
        if (g.ano > data.ano) {
          return false
        }
        if (g.ano === data.ano && g.mes > data.mes) {
          return false
        }
        if (g.deletado) {
          if (g.deletado.ano < data.ano) {
            return false
          }
          if (g.deletado.ano === data.ano) {
            if (g.deletado.mes <= data.mes) {
              return false
            }
          }
        }
        if (g.mesesDeletado && g.mesesDeletado.includes(id)) {
          return false
        }
        return true
      })
      gastosMes.forEach(g => {
        const index = gastos.findIndex(gasto => gasto.id === g.id)
        if (index > -1) {
          gastos[index] = g
        } else {
          gastos.push(g)
        }
      })
      console.log(gastos)
      state.mensais = gastos
      resolve()
    }),
    cartaoStore.getItem(id)
  ]).then(([unicos, mensais, cartao]) => {
    state.unicos = unicos || []
    state.cartao = cartao || []
  })
}

export const addUnico = async ({ commit, rootGetters }, gasto) => {
  gasto.id = uuid()
  const id = `${gasto.ano}-${gasto.mes}`
  if ((typeof gasto.valor) === 'string') {
    gasto.valor = rootGetters.toNumber(gasto.valor)
  }
  let gastos = await unicosStore.getItem(id)
  if (!gastos) {
    gastos = []
  }
  gastos.push(gasto)
  return new Promise(resolve => {
    unicosStore.setItem(id, gastos).then(() => {
      commit('ADD_UNICO', gasto)
      resolve()
    })
  })
}

export const updateUnico = async ({ commiti, rootGetters }, gasto) => {
  const id = `${gasto.ano}-${gasto.mes}`
  const gastos = await unicosStore.getItem(id)
  const updateIndex = gastos.findIndex(g => g.id === gasto.id)
  if ((typeof gasto.valor) === 'string') {
    gasto.valor = rootGetters.toNumber(gasto.valor)
  }
  gastos[updateIndex] = gasto
  return unicosStore.setItem(id, gastos)
}

export const deleteUnico = async ({ commit }, payload) => {
  const id = `${payload.data.ano}-${payload.data.mes}`
  const gastos = await unicosStore.getItem(id)
  const deleteIndex = gastos.findIndex(g => g.id === payload.gastoId)
  if (deleteIndex === -1) {
    console.error('Índice de deleção não encontrado!')
    return
  }
  gastos.splice(deleteIndex, 1)
  return unicosStore.setItem(id, gastos)
}

export const addMensal = ({ commit, rootState, rootGetters }, gasto) => {
  gasto.id = uuid()
  if ((typeof gasto.valor) === 'string') {
    gasto.valor = rootGetters.toNumber(gasto.valor)
  }
  gasto.ano = rootState.data.ano
  gasto.mes = rootState.data.mes
  return new Promise(async (resolve) => {
    const gastos = await mensaisStore.getItem('gastos') || []
    gastos.push(gasto)
    await mensaisStore.setItem('gastos', gastos)
    commit('ADD_MENSAL', gasto)
    resolve()
  })
}

export const updateMensal = async ({ commiti, rootGetters }, payload) => {
  const id = `${payload.data.ano}-${payload.data.mes}`
  const gasto = payload.gasto
  const gastos = await mensaisStore.getItem('gastos')
  const gastoIndex = gastos.findIndex(g => g.id === payload.gasto.id)
  if ((typeof gasto.valor) === 'string') {
    gasto.valor = rootGetters.toNumber(gasto.valor)
  }
  if (payload.opcao === 'este') {
    const gastosMes = await mensaisStore.getItem(id) || []
    const gastoMesIndex = gastosMes.findIndex(g => g.id === gasto.id)
    if (gastoMesIndex > -1) {
      gastosMes[gastoMesIndex] = gasto
    } else {
      gastosMes.push(gasto)
    }
    if (!gastos[gastoIndex].replicado) {
      gastos[gastoIndex].replicado = []
    }
    if (!gastos[gastoIndex].replicado.includes(id)) {
      gastos[gastoIndex].replicado.push(id)
      await mensaisStore.setItem('gastos', gastos)
    }
    return mensaisStore.setItem(id, gastos)
  }
  gastos[gastoIndex].deletado = payload.data
  gasto.ano = payload.data.ano
  gasto.mes = payload.data.mes
  gasto.derivado = gasto.id
  gasto.id = uuid()
  gastos.push(payload.gasto)
  return mensaisStore.setItem('gastos', gastos)
}

export const deleteMensalMes = async ({ commit }, payload) => {
  const id = `${payload.data.ano}-${payload.data.mes}`
  const gastosMes = await mensaisStore.getItem(id) || []
  const deleteMesIndex = gastosMes.findIndex(g => g.id === payload.gastoId)
  if (deleteMesIndex > -1) {
    gastosMes.splice(deleteMesIndex, 1)
    await mensaisStore.setItem(id, gastosMes)
  }
  const gastos = await mensaisStore.getItem('gastos')
  const deleteIndex = gastos.findIndex(g => g.id === payload.gastoId)
  if (deleteIndex === -1) {
    console.error('Índice de deleção não encontrado!')
    return
  }
  const gasto = gastos[deleteIndex]
  if (!gasto.mesesDeletado) {
    gasto.mesesDeletado = []
  }
  gasto.mesesDeletado.push(id)
  gastos[deleteIndex] = gasto
  return mensaisStore.setItem('gastos', gastos)
}

export const deleteMensal = async ({ commit }, payload) => {
  const gastos = await mensaisStore.getItem('gastos')
  const deleteIndex = gastos.findIndex(g => g.id === payload.gastoId)
  if (deleteIndex === -1) {
    console.error('Índice de deleção não encontrado!')
    return
  }
  const gasto = gastos[deleteIndex]
  if (gasto.mesesReplicado) {
    await Promise.all(gasto.mesesReplicado.map(m => {
      const arrMes = m.split('-')
      const data = {
        ano: arrMes[0],
        mes: arrMes[1]
      }
      return deleteMensalMes({ commit }, {
        data,
        gastoId: gasto.id
      })
    }))
  }
  gastos.splice(deleteIndex, 1)
  return mensaisStore.setItem('gastos', gastos)
}

export const deleteMensalPartir = async ({ commit }, payload) => {
  const gastos = await mensaisStore.getItem('gastos')
  const deleteIndex = gastos.findIndex(g => g.id === payload.gastoId)
  if (deleteIndex === -1) {
    console.error('Índice de deleção não encontrado!')
    return
  }
  const gasto = gastos[deleteIndex]
  gasto.deletado = payload.data
  gastos[deleteIndex] = gasto
  return mensaisStore.setItem('gastos', gastos)
}

export const addCartao = ({ commit, rootGetters }, gasto) => {
  gasto.id = uuid()
  if ((typeof gasto.valor) === 'string') {
    gasto.valor = rootGetters.toNumber(gasto.valor)
  }
  let ano = gasto.ano
  let mes = gasto.mes
  return new Promise(async (resolve) => {
    for (let i = 1; i <= gasto.parcelas; i++) {
      const id = `${ano}-${mes}`
      let gastos = await cartaoStore.getItem(id)
      if (!gastos) {
        gastos = []
      }
      gastos.push(gasto)
      await cartaoStore.setItem(id, gastos)
      if (mes === 12) {
        ano++
        mes = 1
      } else {
        mes++
      }
    }
    resolve()
  })
}

export const deleteCartao = ({ commit }, gasto) => {
  let ano = gasto.ano
  let mes = gasto.mes
  return new Promise(async (resolve) => {
    for (let i = 1; i <= gasto.parcelas; i++) {
      const id = `${ano}-${mes}`
      let gastos = await cartaoStore.getItem(id)
      const deleteIndex = gastos.findIndex(g => g.id === gasto.id)
      if (deleteIndex > -1) {
        gastos.splice(deleteIndex, 1)
      } else {
        console.error('Delete index não encontrado')
      }
      await cartaoStore.setItem(id, gastos)
      if (mes === 12) {
        ano++
        mes = 1
      } else {
        mes++
      }
    }
    resolve()
  })
}

export const updateCartao = async ({ commit, rootGetters }, gastos) => {
  await deleteCartao({ commit }, gastos.antigo)
  await addCartao({ commit, rootGetters }, gastos.novo)
}
