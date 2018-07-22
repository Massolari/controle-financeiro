<template>
    <q-page>
        <q-list>
            <q-list-header>Cartões</q-list-header>
            <q-item :key="c.id" v-for="c in cartoes">
                <q-item-side left icon="credit_card" />
                <q-item-main :label="`${c.nome} (final ${c.final})`" :sublabel="`Limite disponível ${toMoney(c.limiteDisponivel)}`" />
                <q-item-side right color="blue" icon="create" />
            </q-item>
        </q-list>

        <q-btn
        round
        color="primary"
        @click="openModal"
        class="fixed q-btn-fab"
        icon="add"
        style="right: 18px; bottom: 18px"
        />
    </q-page>
</template>

<script>
export default {
  name: 'Cartao',
  data () {
    return {
      cartoes: [
        {
          id: 1,
          nome: 'Mastercard',
          final: '2522',
          limiteDisponivel: 700
        },
        {
          id: 2,
          nome: 'Visa',
          final: '8563',
          limiteDisponivel: 82.34
        }
      ]
    }
  },
  methods: {
    toMoney (valor) {
      return this.$store.getters['gastos/toMoney'](valor)
    },
    openModal () {

    }
  }
}
</script>

<style>
</style>
