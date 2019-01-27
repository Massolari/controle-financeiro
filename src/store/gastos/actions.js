/*
export const someAction = (state) => {
}
*/
import uuid from '../../plugins/uuid'
import { unicosStore, mensaisStore, cartaoStore } from '../../persistence/gastos'

export const carregar = ({ state }, { data, force }) => {
  state.unicos = []
  console.log(data)
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
    new Promise(resolve => {
      if (!force && state.cartao.length > 0) {
        resolve()
        return
      }
      state.cartao = []
      cartaoStore.iterate((gasto) => {
        if (gasto.mes === data.mes && gasto.ano === data.ano) {
          state.cartao.push(gasto)
        }
      }).then(() => resolve())
    })
  ]).then(([unicos]) => {
    console.log(unicos)
    state.unicos = unicos || []
    console.log(state.unicos)
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

export const addMensal = ({ commit }, gasto) => {
  gasto.id = uuid()
  return new Promise(resolve => {
    mensaisStore.setItem(gasto.id, gasto).then(() => {
      commit('ADD_MENSAL', gasto)
      resolve()
    })
  })
}

export const addCartao = ({ commit }, gasto) => {
  gasto.id = uuid()
  return new Promise(resolve => {
    cartaoStore.setItem(gasto.id, gasto).then(() => {
      commit('ADD_CARTAO', gasto)
      resolve()
    })
  })
}
