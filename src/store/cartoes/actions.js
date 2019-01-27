/*
export const someAction = (state) => {
}
*/
import uuid from '../../plugins/uuid'
import { cartoesStore } from '../../persistence/cartoes'

export const add = ({ commit }, payload) => {
  payload.cartao.id = uuid()
  const cartao = payload.cartao
  return new Promise(resolve => {
    cartoesStore.setItem(cartao.id, cartao).then(() => {
      commit('ADD_CARTAO', cartao)
      resolve()
    })
  })
}

export const carregar = ({ state }, force) => {
  if (!force && state.cartoes.length > 0) return
  state.cartoes = []
  return cartoesStore.iterate((cartao) => {
    state.cartoes.push(cartao)
  })
}
