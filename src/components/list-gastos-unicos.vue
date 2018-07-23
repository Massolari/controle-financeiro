<template>
    <q-collapsible icon="attach_money" :label="`Gastos únicos (${toMoney(totalUnicos)})`">
      <q-item :key="u.desc" v-for="u in unicos">
        <q-item-main :label="toMoney(u.valor)" :sublabel="u.desc"/>
        <q-item-side right>
          <q-item-tile icon="create" color="blue" @click="editar(u.id)"/>
        </q-item-side>
      </q-item>
    </q-collapsible>
</template>

<script>
export default {
  name: 'ListGastosUnicos',
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
    unicos () {
      return this.$store.state.gastos.unicos
    },
    totalUnicos () {
      return this.$store.getters['gastos/totalUnicos']
    }
  }
}
</script>

<style>
</style>
