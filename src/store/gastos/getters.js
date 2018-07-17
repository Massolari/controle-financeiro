/*
export const someGetter = (state) => {
}
*/
export const totalUnicos = (state) => {
  return state.unicos.reduce((soma, gasto) => soma + gasto.valor, 0)
}
export const totalMensais = (state) => {
  return state.mensais.reduce((soma, gasto) => soma + gasto.valor, 0)
}
export const totalCartao = (state) => {
  return state.cartao.reduce((soma, gasto) => soma + gasto.valor, 0)
}
export const total = (state, getters) => {
  return getters.totalUnicos + getters.totalMensais + getters.totalCartao
}
export const toMoney = () => (value) => {
  return `R$ ${parseFloat(value).toFixed(2)}`
}
