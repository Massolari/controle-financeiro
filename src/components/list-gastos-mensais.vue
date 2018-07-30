<template>
    <q-collapsible opened icon="calendar_today" :label="`Gastos mensais (${toMoney(totalMensais)})`">
      <q-item :key="m.id" v-for="m in mensais">
        <q-item-main :label="toMoney(m.valor)" :sublabel="m.desc"/>
        <q-item-side right>
          <q-btn
              icon="delete"
              round
              outline
              text-color="red"
              size="md"
              @click="deletar(m.id)"
          />
          <q-btn
              icon="create"
              round
              outline
              text-color="blue"
              size="md"
              @click="editar(m.id)"
          />
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
      return this.$store.getters['util/toMoney'](value)
    },
    editar (id) {
      this.$emit('editar', id)
    },
    deletar (id) {
      this.$emit('deletar', id)
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
