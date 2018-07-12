<template>
  <q-page padding>
    <conta-list></conta-list>
    <q-btn
      round
      color="primary"
      @click="inserir"
      class="fixed"
      icon="add"
      :fab="true"
      style="right: 18px; bottom: 18px"
    />
    <conta-modal
      :show="addModal"
      mensagem="Adicionar gasto"
      @salvar="addConta"
      @close="() => addModal = false"
    ></conta-modal>
  </q-page>
</template>

<style>
</style>

<script>
import contaList from '../components/conta-list'
import contaModal from '../components/conta-modal'

export default {
  name: 'PageIndex',
  data () {
    return {
      addModal: false
    }
  },
  methods: {
    inserir () {
      this.addModal = true
    },
    addConta (conta) {
      this.$store.commit('contas/ADD_CONTA', conta)
    }
  },
  components: {
    contaList,
    contaModal
  }
}
</script>
