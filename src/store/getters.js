export const data = (state) => state.data

export const toNumber = (state) => (stringNumber) => parseFloat(String(stringNumber).replace(/\./, '').replace(/,/, '.'))

// export const toMoneyFromNumber = () => (value) => `R$ ${parseFloat(value).toFixed(2).replace(/[.]/g, ',')}`
export const toMoneyFromNumber = () => (value) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
