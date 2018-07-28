<template>
  <q-list>
      <q-item>
          <q-item-side left @click.native="anterior">
            <i class="material-icons" >arrow_back_ios</i>
          </q-item-side>
              <q-item-main>Gastos no mês de {{ mesAtual }} de {{ data.ano }}</q-item-main>
          <q-item-side right @click.native="proximo">
            <i class="material-icons">arrow_forward_ios</i>
          </q-item-side>
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
      return this.$store.getters['util/toMoney'](number)
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
      ][this.data.mes - 1]
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
