/*
export const someGetter = (state) => {
}
*/
export const toMoney = () => (value) => {
  return `R$ ${parseFloat(value).toFixed(2).replace(/[.]/g, ',')}`
}
