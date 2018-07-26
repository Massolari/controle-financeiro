/*
export const someAction = (state) => {
}
*/
import uuid from '../../plugins/uuid'

export const addUnico = ({ commit }, payload) => {
  payload.gasto.id = uuid()
  commit('ADD_UNICO', payload.gasto)
}

export const addMensal = ({ commit }, payload) => {
  payload.gasto.id = uuid()
  commit('ADD_MENSAL', payload.gasto)
}

export const addCartao = ({ commit }, payload) => {
  payload.gasto.id = uuid()
  commit('ADD_CARTAO', payload.gasto)
}
