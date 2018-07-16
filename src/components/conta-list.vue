<template>
  <q-list highlight>
    <q-list-header>Gastos no mês de {{ mesAtual }}</q-list-header>
    <q-item-separator></q-item-separator>
    <!-- <q-item :key="u.desc" v-for="u in unicos"> -->
    <!--   <q-item-main :label="toMoney(u.valor)" :sublabel="u.desc"/> -->
    <!--   <q-item-side right> -->
    <!--     <q-item-tile icon="create" color="blue" @click="editar"/> -->
    <!--   </q-item-side> -->
    <!-- </q-item> -->
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
    unicos () {
      return this.$store.state.gastos.unicos
    },
    mensais () {
      return this.$store.state.gastos.mensais
    },
    cartao () {
      return this.$store.state.gastos.cartao
    },
    total () {
      return this.$store.state.contas.contas.reduce((soma, conta) => soma + conta.valor, 0)
    }
  }
}
</script>

<style>
</style>
