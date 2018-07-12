<template>
  <q-list highlight>
    <q-list-header>Gastos no mês de {{ mesAtual }}</q-list-header>
    <q-item-separator></q-item-separator>
    <q-item :key="c.id" v-for="c in contas">
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
    contas () {
      return this.$store.state.contas.contas
    },
    total () {
      return this.$store.state.contas.contas.reduce((soma, conta) => soma + conta.valor, 0)
    }
  }
}
</script>

<style>
</style>
