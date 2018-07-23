<template>
    <q-collapsible icon="credit_card" :label="`Gastos no cartão (${toMoney(totalCartao)})`">
      <q-item :key="c.desc" v-for="c in cartao">
        <q-item-main :label="toMoney(c.valor)" :sublabel="c.desc"/>
        <q-item-side right>
          <q-item-tile icon="create" color="blue" @click="editar(u.id)"/>
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
      return this.$store.getters['gastos/toMoney'](value)
    },
    editar (id) {
      this.$emit('editar', id)
    }
  },
  computed: {
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
