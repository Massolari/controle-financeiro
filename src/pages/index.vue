<template>
  <q-page padding>
    <conta-list></conta-list>
    <q-fab
      class="fixed"
      style="right: 18px; bottom: 18px"
      color="primary"
      direction="up"
      icon="add"
      >

      <q-fab-action color="purple" icon="mail">
      </q-fab-action>
      <q-fab-action color="secondary" icon="alarm">
        <q-tooltip anchor="center left" self="center right" :offset="[20, 0]">Alarm</q-tooltip>
      </q-fab-action>
    </q-fab>
    <!-- <q-btn -->
    <!--   round -->
    <!--   color="primary" -->
    <!--   @click="inserir" -->
    <!--   class="fixed" -->
    <!--   icon="add" -->
    <!--   :fab="true" -->
    <!--   style="right: 18px; bottom: 18px" -->
    <!-- /> -->
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
