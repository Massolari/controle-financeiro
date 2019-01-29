/*
export const someAction = (state) => {
}
*/
import uuid from '../../plugins/uuid'
import { unicosStore, mensaisStore, cartaoStore } from '../../persistence/gastos'

export const carregar = ({ state }, { data, force }) => {
  state.unicos = []
  state.cartao = []
  return Promise.all([
    unicosStore.getItem(`${data.ano}-${data.mes}`),
    new Promise((resolve) => {
      if (!force && state.mensais.length > 0) {
        resolve()
        return
      }
      state.mensais = []
      mensaisStore.iterate((gasto) => {
        state.mensais.push(gasto)
      }).then(() => resolve())
    }),
    cartaoStore.getItem(`${data.ano}-${data.mes}`)
  ]).then(([unicos, mensais, cartao]) => {
    state.unicos = unicos || []
    state.cartao = cartao || []
  })
}

export const addUnico = async ({ commit }, gasto) => {
  gasto.id = uuid()
  const id = `${gasto.ano}-${gasto.mes}`
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

export const updateUnico = async ({ commit }, gasto) => {
  const id = `${gasto.ano}-${gasto.mes}`
  const gastos = await unicosStore.getItem(id)
  const updateIndex = gastos.findIndex(g => g.id === gasto.id)
  gastos[updateIndex] = gasto
  return unicosStore.setItem(id, gastos)
}

export const deleteUnico = async ({ commit }, payload) => {
  const id = `${payload.data.ano}-${payload.data.mes}`
  const gastos = await unicosStore.getItem(id)
  const deleteIndex = gastos.findIndex(g => g.id === payload.gastoId)
  if (deleteIndex === -1) {
    console.error('Índice de deleção não encontrado!')
  }
  gastos.splice(deleteIndex, 1)
  return unicosStore.setItem(id, gastos)
}

export const addMensal = ({ commit, rootState }, gasto) => {
  gasto.id = uuid()
  gasto.ano = rootState.data.ano
  gasto.mes = rootState.data.mes
  return new Promise(resolve => {
    mensaisStore.setItem(gasto.id, gasto).then(() => {
      commit('ADD_MENSAL', gasto)
      resolve()
    })
  })
}

export const addCartao = ({ commit }, gasto) => {
  gasto.id = uuid()
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
      const deleteIndex = gastos.find(g => g.id === gasto.id)
      gastos.splice(deleteIndex, 1)
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

export const updateCartao = async ({ commit }, gastos) => {
  console.log(gastos)
  await deleteCartao({ commit }, gastos.antigo)
  await addCartao({ commit }, gastos.novo)
}
