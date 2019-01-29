/*
export const someGetter = (state) => {
}
*/
export const toMoney = () => (value) => {
  // return `R$ ${Number(value.toFixed(2)).toLocaleString()}`
  return `R$ ${parseFloat(value).toFixed(2).replace(/[.]/g, ',')}`
}
