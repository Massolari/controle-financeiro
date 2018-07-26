<template>
    <q-page>
        <q-list>
            <q-list-header>Cartões</q-list-header>
            <q-item :key="c.id" v-for="c in cartoes">
                <q-item-side left icon="credit_card" />
                <q-item-main :label="`${c.nome}`" :sublabel="`Limite disponível ${toMoney(c.limite)}`" />
                <q-item-side right color="blue" icon="create" />
            </q-item>
        </q-list>

        <q-btn
            round
            color="primary"
            @click="openModal"
            class="fixed q-btn-fab"
            icon="add"
            style="right: 18px; bottom: 18px"
        />

        <modal-add-cartao
            :show="addModal"
            @salvar="addCartao"
        ></modal-add-cartao>
    </q-page>
</template>

<script>
import modalAddCartao from '../components/modal-add-cartao'

export default {
  name: 'Cartao',
  data () {
    return {
      addModal: false
    }
  },
  methods: {
    toMoney (valor) {
      return this.$store.getters['util/toMoney'](valor)
    },
    openModal () {
      this.addModal = true
    },
    addCartao (cartao) {
      this.$store.dispatch('cartoes/add', {
        cartao: Object.assign({}, cartao)
      })
      this.addModal = false
    }
  },
  computed: {
    cartoes () {
      return this.$store.state.cartoes.cartoes
    }
  },
  components: {
    modalAddCartao
  }
}
</script>

<style>
</style>
