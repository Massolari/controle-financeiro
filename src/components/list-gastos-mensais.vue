<template>
  <q-collapsible :opened="totalMensais > 0" :disable="totalMensais === 0" icon="calendar_today" :label="`Gastos mensais (${toMoney(totalMensais)})`">
      <q-item :key="m.id" v-for="m in mensaisNaoExcluidos">
        <q-item-main :label="toMoney(m.valor)" @click.native="editar(m.id)">
          <q-item-tile sublabel lines="2">
            {{ m.desc }}<br />
            {{ montaVencimento(m.vencimento) }}
          </q-item-tile>
        </q-item-main>
        <!-- <q-item-main :label="toMoney(m.valor)" :sublabel="`${m.desc} (Venc.: ${m.vencimento})`"/> -->
        <q-item-side right>
          <q-btn
              icon="delete"
              round
              outline
              text-color="red"
              size="md"
              @click="deletar(m.id)"
          />
          <!-- <q-btn -->
          <!--     icon="create" -->
          <!--     round -->
          <!--     outline -->
          <!--     text-color="blue" -->
          <!--     size="md" -->
          <!--     @click="editar(m.id)" -->
          <!-- /> -->
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
    },
    montaVencimento (diaVencimento) {
      const data = new Date()
      const mesAtual = data.getMonth() + 1
      let texto = `Vencimento: ${diaVencimento}/${`0${this.data.mes}`.slice(-2)}`
      if (this.data.mes === mesAtual) {
        if (data.getDate() === diaVencimento) {
          texto += ' (HOJE!)'
        }
        if (data.getDate() < diaVencimento) {
          const dias = diaVencimento - data.getDate()
          let tempo = `Daqui há ${dias} dias`
          if (dias === 1) {
            tempo = 'amanhã!'
          }
          texto += `(${tempo})`
        }
      }
      return texto
    }
  },
  computed: {
    data () {
      return this.$store.state.data
    },
    mensais () {
      return this.$store.state.gastos.mensais
    },
    totalMensais () {
      return this.$store.getters['gastos/totalMensais']
    },
    mensaisNaoExcluidos () {
      return this.$store.getters['gastos/mensaisNaoExcluidos']
    }
  }
}
</script>

<style>
</style>
