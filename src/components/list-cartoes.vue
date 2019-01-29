<template>
    <q-list>
        <q-list-header>Cartões</q-list-header>
        <q-item :key="c.id" v-for="(c, index) in cartoes">
            <q-item-side left icon="credit_card" />
            <q-item-main :label="`${c.nome}`" :sublabel="`Limite disponível: ${limiteCartao(index)}`"/>
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
  mounted () {
    this.calcularLimteCartoes()
  },
  data () {
    return {
      limites: []
    }
  },
  watch: {
    cartoes (newValue) {
      if (newValue.length) {
        this.calcularLimteCartoes()
      }
    }
  },
  methods: {
    toMoney (value) {
      return this.$store.getters['util/toMoney'](value)
    },
    calcularLimteCartoes () {
      const calculoLimites = []
      this.cartoes.forEach(c => {
        calculoLimites.push(this.calcularLimiteCartao(c))
      })
      Promise.all(calculoLimites).then(limites => {
        this.limites = limites
      })
    },
    calcularLimiteCartao (cartao) {
      return this.$store.getters['cartoes/limiteDisponivel']({
        cartao,
        data: this.$store.state.util.data
      })
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
    },
    limiteCartao () {
      return (index) => {
        return (this.limites[index]) ? this.toMoney(this.limites[index]) : 'Calculando...'
      }
    }
  }
}
</script>

<style>
</style>
