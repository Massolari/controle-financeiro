<template>
    <q-collapsible opened icon="credit_card" :label="`Gastos no cartão (${toMoney(totalCartao)})`">
      <q-item :key="c.id" v-for="c in cartao">
        <q-item-main :label="toMoney(c.valor)" :sublabel="montarDescricao(c)"/>
        <q-item-side right>
          <q-btn
              icon="delete"
              round
              outline
              text-color="red"
              size="md"
              @click="deletar(c.id)"
          />
          <q-btn
              icon="create"
              round
              outline
              text-color="blue"
              size="md"
              @click="editar(c.id)"
          />
        </q-item-side>
      </q-item>
    </q-collapsible>
</template>

<script>
export default {
  name: 'ListGastosCartao',
  data () {
    return {}
  },
  methods: {
    toMoney (value) {
      return this.$store.getters['util/toMoney'](value)
    },
    calcularParcelaAtual (gasto) {
      let ano = gasto.ano
      let mes = gasto.mes
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
      return `${gasto.desc} (${this.calcularParcelaAtual(gasto)}/${gasto.parcelas})`
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
      return this.$store.getters['util/dataAtual']
    },
    cartao () {
      return this.$store.state.gastos.cartao
    },
    totalCartao () {
      return this.$store.getters['gastos/totalCartao']
    }
  }
}
</script>

<style>
</style>
