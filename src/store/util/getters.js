/*
export const someGetter = (state) => {
}
*/
export const dataAtual = (state) => {
  return state.data
}

export const toMoney = () => (value) => {
  // return `R$ ${Number(value.toFixed(2)).toLocaleString()}`
  return `R$ ${parseFloat(value).toFixed(2).replace(/[.]/g, ',')}`
}
