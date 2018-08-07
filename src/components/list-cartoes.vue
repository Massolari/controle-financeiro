<template>
    <q-list>
        <q-list-header>Cartões</q-list-header>
        <q-item :key="c.id" v-for="c in cartoes">
            <q-item-side left icon="credit_card" />
            <q-item-main :label="`${c.nome}`" :sublabel="`Limite disponível: ${toMoney(c.limite)}`"/>
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
    </q-list>
</template>

<script>
export default {
  name: 'ListCartoes',
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
    cartoes () {
      return this.$store.state.cartoes.cartoes
    }
  }
}
</script>

<style>
</style>
