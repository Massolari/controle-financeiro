<template>
    <q-collapsible icon="calendar_today" :label="`Gastos mensais (${toMoney(totalMensais)})`">
      <q-item :key="m.desc" v-for="m in mensais">
        <q-item-main :label="toMoney(m.valor)" :sublabel="m.desc"/>
        <q-item-side right>
          <q-item-tile icon="create" color="blue" @click="editar(u.id)"/>
        </q-item-side>
      </q-item>
    </q-collapsible>
</template>

<script>
export default {
  name: 'ListGastosMensais',
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
    mensais () {
      return this.$store.state.gastos.mensais
    },
    totalMensais () {
      return this.$store.getters['gastos/totalMensais']
    }
  }
}
</script>

<style>
</style>
