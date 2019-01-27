/*
export const someGetter = (state) => {
}
*/
import { cartaoStore } from '../../persistence/gastos'

export const limiteDisponivel = () => async (payload) => {
  let gastos = await cartaoStore.getItem(`${payload.data.ano}-${payload.data.mes}`)
  if (!gastos) {
    gastos = []
  }
  const valorGasto = gastos.reduce((acc, g) => {
    if (g.cartao.id === payload.cartao.limite) {
      acc += g.valor * g.parcelas
    }
    return acc
  }, 0)
  return payload.cartao.limite - valorGasto
}
