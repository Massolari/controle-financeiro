/*
export const someMutation = (state) => {
}
*/
export const PREV_YEAR = (state) => {
  state.data.ano--
  state.data.mes = 12
}

export const PREV_MONTH = (state) => {
  state.data.mes--
}

export const NEXT_YEAR = (state) => {
  state.data.ano++
  state.data.mes = 1
}

export const NEXT_MONTH = (state) => {
  state.data.mes++
}
