<template>
    <q-collapsible opened icon="calendar_today" :label="`Gastos mensais (${toMoney(totalMensais)})`">
      <q-item :key="m.id" v-for="m in mensaisNaoExcluidos">
        <q-item-main :label="toMoney(m.valor)" :sublabel="`${m.desc} (Venc.: ${m.vencimento})`"/>
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
    verificarDeletadoPartir (data) {
      if (data.ano < this.data.ano) {
        return true
      }
      if (data.ano === this.data.ano) {
        return data.mes <= this.data.mes
      }
      return false
    },
    editar (id) {
      this.$emit('editar', id)
    },
    deletar (id) {
      this.$emit('deletar', id)
    }
  },
  computed: {
    data () {
      return this.$store.state.util.data
    },
    mensais () {
      return this.$store.state.gastos.mensais
    },
    totalMensais () {
      return this.$store.getters['gastos/totalMensais']
    },
    mensaisNaoExcluidos () {
      return this.mensais.filter(m => {
        if (m.deletadoPartir && this.verificarDeletadoPartir(m.deletadoPartir)) {
          return false
        }
        if (m.deletados && m.deletados.find(d => d.ano === this.data.ano && d.mes === this.data.mes)) {
          return false
        }
        return true
      })
    }
  }
}
</script>

<style>
</style>
