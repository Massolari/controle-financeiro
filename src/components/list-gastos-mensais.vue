<template>
  <q-collapsible :opened="totalMensais > 0" :disable="totalMensais === 0">
      <template slot="header">
        <q-item-side left>
          <q-icon name="calendar_today" color="purple" size="24px"/>
        </q-item-side>
        <q-item-main :label="`Mensais (${toMoney(totalMensais)})`"/>
      </template>
      <q-item :key="m.id" v-for="m in mensaisNaoExcluidos" :style="{ 'background-color': (m.pago) ? 'lightgreen' : 'white' }">
        <q-item-main :label="toMoney(m.valor)" @click.native="editar(m.id)">
          <q-item-tile sublabel lines="2">
            {{ m.desc }}<br />
            {{ montaVencimento(m.vencimento) }}
          </q-item-tile>
        </q-item-main>
        <!-- <q-item-main :label="toMoney(m.valor)" :sublabel="`${m.desc} (Venc.: ${m.vencimento})`"/> -->
        <q-item-side right>
          <q-btn
              v-if="m.pago"
              icon="money_off"
              round
              outline
              text-color="red"
              size="md"
              @click="desmarcarPago(m.id)"
          />
          <q-btn
              v-else
              icon="attach_money"
              round
              outline
              text-color="green"
              size="md"
              @click="marcarPago(m.id)"
          />
          <q-btn
              icon="delete"
              round
              outline
              text-color="red"
              size="md"
              @click="deletar(m.id)"
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
      return this.$store.getters['toMoney'](value)
    },
    editar (id) {
      this.$emit('editar', id)
    },
    deletar (id) {
      this.$emit('deletar', id)
    },
    marcarPago (id) {
      this.$emit('marcar', id)
    },
    desmarcarPago (id) {
      this.$emit('desmarcar', id)
    },
    montaVencimento (diaVencimento) {
      const data = new Date()
      const mesAtual = data.getMonth() + 1
      let texto = `Vencimento: ${`0${diaVencimento}`.slice(-2)}/${`0${this.data.mes}`.slice(-2)}`
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
          texto += ` (${tempo})`
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
