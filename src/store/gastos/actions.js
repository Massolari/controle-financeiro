/*
export const someAction = (state) => {
}
*/
import uuid from '../../plugins/uuid'
import { unicosStore, mensaisStore, cartaoStore } from '../../persistence/gastos'

export const carregar = ({ state }, data) => {
  state.unicos = []
  return Promise.all([
    unicosStore.iterate((gasto) => {
      if (gasto.mes === data.mes && gasto.ano === data.ano) {
        state.unicos.push(gasto)
      }
    }),
    new Promise((resolve) => {
      if (state.mensais.length > 0) {
        resolve()
        return
      }
      mensaisStore.iterate((gasto) => {
        state.mensais.push(gasto)
      }).then(() => resolve())
    }),
    cartaoStore.iterate((gasto) => {
      if (gasto.mes === data.mes && gasto.ano === data.ano) {
        state.cartao.push(gasto)
      }
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
