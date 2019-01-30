export const data = (state) => state.data

export const toNumber = (state) => (stringNumber) => parseFloat(String(stringNumber).replace(/\./, '').replace(/,/, '.'))

export const toMoneyFromNumber = () => (value) => `R$ ${parseFloat(value).toFixed(2).replace(/[.]/g, ',')}`
