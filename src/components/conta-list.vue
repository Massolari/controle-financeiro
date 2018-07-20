<template>
  <q-list>
      <q-item>
          <q-item-side @click="anterior" left icon="arrow_back_ios"/>
              <q-item-main>Gastos no mês de {{ mesAtual }} de {{ data.ano }}</q-item-main>
          <q-item-side @click="proximo" right icon="arrow_forward_ios"/>
      </q-item>
    <q-item-separator></q-item-separator>
    <list-gastos-unicos></list-gastos-unicos>
    <q-item-separator></q-item-separator>
    <list-gastos-mensais></list-gastos-mensais>
    <q-item-separator></q-item-separator>
    <list-gastos-cartao></list-gastos-cartao>
    <q-item-separator></q-item-separator>
    <q-item>
      <q-item-main :label="toMoney(total)" sublabel="Total"></q-item-main>
    </q-item>
  </q-list>
</template>

<script>
import listGastosUnicos from './list-gastos-unicos'
import listGastosMensais from './list-gastos-mensais'
import listGastosCartao from './list-gastos-cartao'
export default {
  name: 'contasList',
  props: ['data'],
  data () {
    return {}
  },
  methods: {
    toMoney (number) {
      return `R$ ${parseFloat(number).toFixed(2)}`
    },
    editar (conta) {
      this.$emit('editar', conta)
    },
    anterior () {
      this.$emit('anterior')
    },
    proximo () {
      this.$emit('proximo')
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
      ][this.data.mes]
    },
    total () {
      return this.$store.getters['gastos/total']
    }
  },
  components: {
    listGastosUnicos,
    listGastosMensais,
    listGastosCartao
  }
}
</script>

<style>
</style>
