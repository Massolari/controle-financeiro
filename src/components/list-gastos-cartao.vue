<template>
    <q-collapsible opened icon="credit_card" :label="`Gastos no cartão (${toMoney(totalCartao)})`">
      <q-item :key="c.id" v-for="c in cartao">
        <q-item-main :label="toMoney(c.valor)" :sublabel="c.desc"/>
        <q-item-side right>
          <q-btn
              icon="delete"
              round
              outline
              text-color="red"
              size="md"
              @click="deletar(c.id)"
          />
          <q-btn
              icon="create"
              round
              outline
              text-color="blue"
              size="md"
              @click="editar(c.id)"
          />
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
