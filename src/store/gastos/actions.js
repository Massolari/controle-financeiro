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
  unicosStore.setItem(gasto.id, gasto).then(() => {
    commit('ADD_UNICO', gasto)
  })
}

export const addMensal = ({ commit }, payload) => {
  payload.gasto.id = uuid()
  const gasto = payload.gasto
  mensaisStore.setItem(gasto.id, gasto).then(() => {
    commit('ADD_MENSAL', gasto)
  })
}

export const addCartao = ({ commit }, payload) => {
  payload.gasto.id = uuid()
  const gasto = payload.gasto
  cartaoStore.setItem(gasto.id, gasto).then(() => {
    commit('ADD_CARTAO', gasto)
  })
}
