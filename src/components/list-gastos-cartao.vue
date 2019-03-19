<template>
  <q-collapsible :opened="totalCartao(cartao.id) > 0" :disable="totalCartao(cartao.id) === 0">
      <template slot="header">
        <q-item-side left>
          <q-icon name="credit_card" color="red" size="24px"/>
        </q-item-side>
        <q-item-main :label="`Cartão ${cartao.nome} (${toMoney(totalCartao(cartao.id))})`"/>
      </template>
      <q-item :key="c.id" v-for="c in gastosCartao">
        <q-item-main :label="montarLabel(c)" :sublabel="montarDescricao(c)" @click.native="editar(c)"/>
        <q-item-side right>
          <q-btn
              icon="delete"
              round
              outline
              text-color="red"
              size="md"
              @click="deletar(c)"
          />
        </q-item-side>
      </q-item>
    </q-collapsible>
</template>

<script>
export default {
  name: 'ListGastosCartao',
  props: ['cartao'],
  data () {
    return {}
  },
  methods: {
    toMoney (value) {
      return this.$store.getters['toMoney'](value)
    },
    calcularParcelaAtual (gasto) {
      let ano = Number(gasto.ano)
      let mes = Number(gasto.mes)
      let parcela
      for (parcela = 1; parcela <= gasto.parcelas; parcela++) {
        if (ano === this.data.ano && mes === this.data.mes) {
          break
        }
        if (mes === 12) {
          ano++
          mes = 1
        } else {
          mes++
        }
      }
      return parcela
    },
    montarDescricao (gasto) {
      let descricao = `${gasto.desc}`
      if (gasto.parcelas > 1) {
        descricao += ` (${this.calcularParcelaAtual(gasto)}/${gasto.parcelas})`
      }
      return descricao
    },
    montarLabel (gasto) {
      let label = `${this.toMoney(gasto.valor)} `
      if (gasto.parcelas > 1) {
        label += `(${this.toMoney(Number(gasto.valor) * gasto.parcelas)})`
      }
      return label
    },
    totalCartao (cartaoId) {
      return this.$store.getters['gastos/totalCartao'](cartaoId)
    },
    editar (id) {
      this.$emit('editar', id)
    },
    deletar (id) {
      this.$emit('deletar', id)
    }
  },
  computed: {
    data () {
      return this.$store.state.data
    },
    gastosCartao () {
      return this.$store.state.gastos.cartao.filter(g => g.cartao === this.cartao.id)
    }
  }
}
</script>

<style>
</style>
