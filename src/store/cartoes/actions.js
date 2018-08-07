/*
export const someAction = (state) => {
}
*/
import uuid from '../../plugins/uuid'
import { cartoesStore } from '../../persistence/cartoes'

export const add = ({ commit }, payload) => {
  payload.cartao.id = uuid()
  const cartao = payload.cartao
  cartoesStore.setItem(cartao.id, cartao).then(() => {
    commit('ADD_CARTAO', cartao)
  })
}

export const carregar = ({ state }, payload) => {
  if (!payload.force && state.cartoes.length > 0) return
  state.cartoes = []
  cartoesStore.iterate((cartao) => {
    state.cartoes.push(cartao)
  })
}
