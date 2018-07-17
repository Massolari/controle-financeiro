<template>
  <q-list highlight>
    <q-list-header>Gastos no mês de {{ mesAtual }}</q-list-header>
    <q-item-separator></q-item-separator>
    <list-gastos-unicos></list-gastos-unicos>
    <q-item-separator></q-item-separator>
    <q-list-header>Gastos mensais ({{ toMoney(totalMensais) }})</q-list-header>
    <q-item :key="m.desc" v-for="m in mensais">
      <q-item-main :label="toMoney(m.valor)" :sublabel="m.desc"/>
      <q-item-side right>
        <q-item-tile icon="create" color="blue" @click="editar"/>
      </q-item-side>
    </q-item>
    <q-item-separator></q-item-separator>
    <q-list-header>Gastos do cartão ({{ toMoney(totalCartao) }})</q-list-header>
    <q-item :key="c.desc" v-for="c in cartao">
      <q-item-main :label="toMoney(c.valor)" :sublabel="c.desc"/>
      <q-item-side right>
        <q-item-tile icon="create" color="blue" @click="editar"/>
      </q-item-side>
    </q-item>
    <q-item-separator></q-item-separator>
    <q-item>
      <q-item-main :label="toMoney(total)" sublabel="Total"></q-item-main>
    </q-item>
  </q-list>
</template>

<script>
import listGastosUnicos from './list-gastos-unicos'
export default {
  name: 'contasList',
  data () {
    return {}
  },
  methods: {
    toMoney (number) {
      return `R$ ${parseFloat(number).toFixed(2)}`
    },
    editar (conta) {
      this.$emit('editar', conta)
    }
  },
  computed: {
    mesAtual () {
      return [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro'
      ][(new Date()).getMonth()]
    },
    unicos () {
      return this.$store.state.gastos.unicos
    },
    mensais () {
      return this.$store.state.gastos.mensais
    },
    cartao () {
      return this.$store.state.gastos.cartao
    },
    totalUnicos () {
      return this.$store.state.gastos.unicos.reduce((soma, gasto) => soma + gasto.valor, 0)
    },
    totalMensais () {
      return this.$store.state.gastos.mensais.reduce((soma, gasto) => soma + gasto.valor, 0)
    },
    totalCartao () {
      return this.$store.state.gastos.cartao.reduce((soma, gasto) => soma + gasto.valor, 0)
    },
    total () {
      return this.$store.getters['gastos/total']
    }
  },
  components: {
    listGastosUnicos
  }
}
</script>

<style>
</style>
