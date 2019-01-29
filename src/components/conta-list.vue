<template>
  <q-list>
      <q-item>
          <q-item-side left>
              <q-btn
                  icon="fa fa-arrow-left"
                  round
                  outline
                  size="sm"
                  @click="anterior"
              />
          </q-item-side>
              <q-item-main>Gastos no mês de {{ mesAtual }} de {{ data.ano }}</q-item-main>
          <q-item-side right>
              <q-btn
                  icon="fa fa-arrow-right"
                  round
                  outline
                  size="sm"
                  @click="proximo"
              />
          </q-item-side>
      </q-item>
    <q-item-separator></q-item-separator>
    <list-gastos-unicos
        @deletar="deletarUnico"
        @editar="editarUnico"
    ></list-gastos-unicos>
    <q-item-separator></q-item-separator>
    <list-gastos-mensais
        @deletar="deletarMensal"
        @editar="editarMensal"
    ></list-gastos-mensais>
    <q-item-separator></q-item-separator>
    <list-gastos-cartao
        v-for="c in cartoes"
        :key="c.id"
        :cartao="c"
        @deletar="deletarCartao"
        @editar="editarCartao"
    ></list-gastos-cartao>
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
  data () {
    return {}
  },
  methods: {
    toMoney (number) {
      return this.$store.getters['util/toMoney'](number)
    },
    editarUnico (gastoId) {
      this.$emit('editarUnico', gastoId)
    },
    deletarUnico (gastoId) {
      this.$emit('deletarUnico', gastoId)
    },
    editarMensal (gastoId) {
      this.$emit('editarMensal', gastoId)
    },
    deletarMensal (gastoId) {
      this.$emit('deletarMensal', gastoId)
    },
    editarCartao (gastoId) {
      this.$emit('editarCartao', gastoId)
    },
    deletarCartao (gastoId) {
      this.$emit('deletarCartao', gastoId)
    },
    async anterior () {
      await this.$store.dispatch('mesAnterior')
      this.$emit('mudouMes')
    },
    async proximo () {
      await this.$store.dispatch('mesSeguinte')
      this.$emit('mudouMes')
    }
  },
  computed: {
    data () {
      return this.$store.state.data
    },
    cartoes () {
      return this.$store.state.cartoes.cartoes
    },
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
