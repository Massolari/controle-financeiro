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
      const todosGastos = await mensaisStore.getItem('gastos') || []
      const gastos = todosGastos.filter(g => {
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
          if (g.deletado.ano === data.ano && g.deletado.mes <= data.mes) {
            return false
          }
        }
        if (g.mesesDeletado && g.mesesDeletado.includes(id)) {
          return false
        }
        if (gastosMes.find(gm => [g.id, g.derivado].includes(gm.id) || [g.id, g.derivado].includes(gm.derivado))) {
          return false
        }
        return true
      })
      gastosMes.forEach(g => {
        const index = gastos.findIndex(gasto => gasto.id === g.id)
        if (index > -1) {
          gastos[index] = g
          return
        }
        gastos.push(g)
      })
      console.log(gastos)
      state.mensais = gastos
      resolve()
    }),
    cartaoStore.getItem(id)
  ]).then(([unicos, _, cartao]) => {
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

export const updateUnico = async ({ commit, rootGetters }, gasto) => {
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

export const updateEsteMensal = async ({ commit, rootGetters }, { id, gasto }) => {
  const gastos = await mensaisStore.getItem('gastos')
  const gastosMes = await mensaisStore.getItem(id) || []
  const gastoMesIndex = gastosMes.findIndex(g => g.id === gasto.id)
  const gastoIndex = gastos.findIndex(g => g.id === gasto.id)
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
  return mensaisStore.setItem(id, gastosMes)
}

export const updateMensal = async ({ commit, rootGetters }, payload) => {
  const id = `${payload.data.ano}-${payload.data.mes}`
  const { gasto } = payload
  if ((typeof gasto.valor) === 'string') {
    gasto.valor = rootGetters.toNumber(gasto.valor)
  }
  if (payload.opcao === 'este') {
    return updateEsteMensal({ commit, rootGetters }, { id, gasto })
  }
  const gastos = await mensaisStore.getItem('gastos')
  const gastoIndex = gastos.findIndex(g => g.id === gasto.id)
  const ano = payload.data.ano
  const mes = payload.data.mes
  gasto.ano = ano
  gasto.mes = mes
  if (gastos[gastoIndex].ano === ano && gastos[gastoIndex].mes === mes) {
    gastos.splice(gastoIndex, 1)
  } else {
    gastos[gastoIndex].deletado = payload.data
    if (!gasto.derivado) {
      gasto.derivado = gasto.id
    }
  }
  gasto.id = uuid()
  gastos.push(gasto)
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
  if (gasto.replicado) {
    await deleteReplicadosMensal(commit, gasto.replicado, gasto.id)
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
  const ano = payload.data.ano
  const mes = payload.data.mes
  if (gasto.ano === ano && gasto.mes === mes) {
    deleteMensal({ commit }, { gastoId: gasto.id })
  } else {
    gasto.deletado = payload.data
    gastos[deleteIndex] = gasto
    const gastoDeletado = gastos[deleteIndex]
    if (gastoDeletado.replicado) {
      const replicadosParaDeletar = gastoDeletado.replicado.filter(m => {
        const arrMes = m.split('-')
        const anoReplicado = arrMes[0]
        const mesReplicado = arrMes[1]
        if (anoReplicado < ano) {
          return false
        }
        if (anoReplicado > ano) {
          return true
        }
        return mesReplicado >= mes
      })
      console.log(replicadosParaDeletar)
      if (replicadosParaDeletar.length) {
        console.log('começou')
        await deleteReplicadosMensal(commit, replicadosParaDeletar, gastoDeletado.id)
        console.log('terminou')
      }
    }
  }
  return mensaisStore.setItem('gastos', gastos)
}

const deleteReplicadosMensal = (commit, replicados, gastoId) =>
  Promise.all(replicados.map(m => {
    console.log(m)
    const arrMes = m.split('-')
    const data = {
      ano: arrMes[0],
      mes: arrMes[1]
    }
    return deleteMensalMes({ commit }, {
      data,
      gastoId
    })
  }))

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
