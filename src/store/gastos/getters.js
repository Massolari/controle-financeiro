/*
export const someGetter = (state) => {
}
*/
export const totalUnicos = (state, getters, rootState, rootGetters) => {
  return state.unicos.reduce((soma, gasto) => soma + gasto.valor, 0)
}

const verificarDeletadoPartir = (dataDeletado, dataAtual) => {
  if (dataDeletado.ano < dataAtual.ano) {
    return true
  }
  if (dataDeletado.ano === dataAtual.ano) {
    return dataDeletado.mes <= dataAtual.mes
  }
  return false
}

const verificarInseridoDepois = ({ ano, mes }, dataAtual) => {
  if (ano > dataAtual.ano) {
    return true
  }
  if (ano === dataAtual.ano) {
    return mes > dataAtual.mes
  }
  return false
}

export const mensaisNaoExcluidos = (state, getters, rootState) => {
  const data = rootState.data
  return state.mensais.filter(m => {
    if (verificarInseridoDepois(m, data)) {
      return false
    }
    if (m.deletadoPartir && verificarDeletadoPartir(m.deletadoPartir, data)) {
      return false
    }
    if (m.deletados && m.deletados.find(d => d.ano === data.ano && d.mes === data.mes)) {
      return false
    }
    return true
  })
}

export const totalMensais = (state, getters) =>
  state.mensais.reduce((soma, gasto) => soma + gasto.valor, 0)

export const totalCartao = (state) =>
  (cartaoId) => state.cartao.reduce((soma, gasto) => (gasto.cartao === cartaoId) ? soma + gasto.valor : soma, 0)

export const totalTodosCartao = (state) => state.cartao.reduce((soma, gasto) => soma + gasto.valor, 0)

export const total = (state, getters) => {
  return getters.totalUnicos + getters.totalMensais + getters.totalTodosCartao
}
