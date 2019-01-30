export const mesAnterior = ({ commit, state }) => {
  return new Promise(resolve => {
    if (state.data.mes === 1) {
      commit('PREV_YEAR')
    } else {
      commit('PREV_MONTH')
    }
    resolve()
  })
}
export const mesSeguinte = ({ commit, state }) => {
  return new Promise(resolve => {
    if (state.data.mes === 12) {
      commit('NEXT_YEAR')
    } else {
      commit('NEXT_MONTH')
    }
    resolve()
  })
}
