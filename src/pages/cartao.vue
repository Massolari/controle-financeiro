<template>
    <q-page>
        <list-cartoes
          @deletar="deletar"
          @editar="editarCartao"
        ></list-cartoes>

        <q-btn
            round
            color="primary"
            @click="openAddModal"
            class="fixed q-btn-fab"
            icon="add"
            style="right: 18px; bottom: 18px"
        />

        <modal-add-cartao
            :show="addModal"
            @salvar="addCartao"
            @close="closeAddModal"
        ></modal-add-cartao>

        <modal-edit-cartao
            :show="editar.modal"
            :cartao="editar.cartao"
            @salvar="salvarCartao"
            @close="closeEditModal"
        ></modal-edit-cartao>
    </q-page>
</template>

<script>
import modalAddCartao from '../components/modal-add-cartao'
import modalEditCartao from '../components/modal-edit-cartao'
import listCartoes from '../components/list-cartoes'
import { cartoesStore } from '../persistence/cartoes'

export default {
  name: 'Cartao',
  mounted () {
    this.carregarCartoes()
  },
  data () {
    return {
      addModal: false,
      editar: {
        modal: false,
        cartao: {}
      }
    }
  },
  methods: {
    openAddModal () {
      this.addModal = true
    },
    openEditModal () {
      this.editar.modal = true
    },
    closeAddModal () {
      this.addModal = false
    },
    closeEditModal () {
      this.editar.modal = false
    },
    addCartao (cartao) {
      this.$store.dispatch('cartoes/add', {
        cartao: Object.assign({}, cartao)
      })
      this.addModal = false
    },
    async carregarCartoes (force = false) {
      this.$q.loading.show({
        delay: 0,
        message: 'Carregando cartões...'
      })
      await this.$store.dispatch('cartoes/carregar', {
        force
      })
      this.$q.loading.hide()
    },
    async editarCartao (cartaoId) {
      this.editar.cartao = await cartoesStore.getItem(cartaoId)
      this.editar.modal = true
    },
    async salvarCartao (cartao) {
      await cartoesStore.setItem(cartao.id, cartao)
      this.carregarCartoes(true)
    },
    deletar (cartaoId) {
      this.$q.dialog({
        title: 'Atenção!',
        message: 'Tem certeza que deseja deletar o cartão?',
        ok: {
          label: 'Deletar',
          color: 'red'
        },
        cancel: 'Cancelar'
      }).then(async () => {
        await cartoesStore.removeItem(cartaoId)
        this.carregarCartoes(true)
      }).catch(() => {})
    }
  },
  components: {
    modalAddCartao,
    modalEditCartao,
    listCartoes
  }
}
</script>

<style>
</style>
