/*
export const someAction = (state) => {
}
*/
import uuid from '../../plugins/uuid'

export const add = ({ commit }, payload) => {
  payload.cartao.id = uuid()
  commit('ADD_CARTAO', payload.cartao)
}
