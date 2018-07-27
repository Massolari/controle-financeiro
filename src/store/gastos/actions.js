/*
export const someAction = (state) => {
}
*/
import uuid from '../../plugins/uuid'
import localforage from 'localforage'

const unicosStore = localforage.createInstance({
  name: 'unicos'
})
const mensaisStore = localforage.createInstance({
  name: 'mensais'
})
const cartaoStore = localforage.createInstance({
  name: 'cartao'
})

export const carregar = ({ state }, data) => {
  state.unicos = []
  unicosStore.iterate((key, gasto) => {
    if (gasto.mes === data.mes && gasto.ano === data.ano) {
      state.unicos.push(gasto)
    }
  })
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
