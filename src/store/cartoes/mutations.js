/*
export const someMutation = (state) => {
}
*/
export const ADD_UNICO = (state, gasto) => {
  state.unicos.push(gasto)
}
export const ADD_MENSAL = (state, gasto) => {
  state.mensais.push(gasto)
}
export const ADD_CARTAO = (state, gasto) => {
  state.cartao.push(gasto)
}
