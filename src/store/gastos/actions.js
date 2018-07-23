/*
export const someAction = (state) => {
}
*/

export const addUnico = ({ commit }, payload) => {
  commit('ADD_UNICO', payload.gasto)
}

export const addMensal = ({ commit }, payload) => {
  commit('ADD_MENSAL', payload.gasto)
}

export const addCartao = ({ commit }, payload) => {
  commit('ADD_CARTAO', payload.gasto)
}
