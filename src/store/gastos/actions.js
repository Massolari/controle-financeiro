/*
export const someAction = (state) => {
}
*/
import uuid from '../../plugins/uuid'
import { unicosStore, mensaisStore, cartaoStore } from '../../persistence/gastos'

export const carregar = ({ state }, { data, force }) => {
  state.unicos = []
  return Promise.all([
    unicosStore.iterate((gasto) => {
      if (gasto.mes === data.mes && gasto.ano === data.ano) {
        state.unicos.push(gasto)
      }
    }),
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
  ])
}

export const addUnico = ({ commit }, payload) => {
  payload.gasto.id = uuid()
  const gasto = payload.gasto
  return new Promise(resolve => {
    unicosStore.setItem(gasto.id, gasto).then(() => {
      commit('ADD_UNICO', gasto)
      resolve()
    })
  })
}

export const addMensal = ({ commit }, payload) => {
  payload.gasto.id = uuid()
  const gasto = payload.gasto
  return new Promise(resolve => {
    mensaisStore.setItem(gasto.id, gasto).then(() => {
      commit('ADD_MENSAL', gasto)
      resolve()
    })
  })
}

export const addCartao = ({ commit }, payload) => {
  payload.gasto.id = uuid()
  const gasto = payload.gasto
  return new Promise(resolve => {
    cartaoStore.setItem(gasto.id, gasto).then(() => {
      commit('ADD_CARTAO', gasto)
      resolve()
    })
  })
}
