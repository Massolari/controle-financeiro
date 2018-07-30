<template>
  <q-page padding>
    <conta-list
      :data="data"
      @anterior="anterior"
      @proximo="proximo"
      @editarUnico="editarUnico"
      @deletarUnico="deletarUnico"
      @editarMensal="editarMensal"
      @deletarMensal="deletarMensal"
      @editarCartao="editarCartao"
    ></conta-list>

    <btn-add-conta
      @addUnico="inserirUnico"
      @addMensal="inserirMensal"
      @addCartao="inserirCartao"
    ></btn-add-conta>

    <modal-add-gasto-unico
      :show="adicionar.modal.unico"
      @salvar="addUnico"
      @close="() => adicionar.modal.unico = false"
    ></modal-add-gasto-unico>

    <modal-edit-gasto-unico
      :show="editar.modal.unico"
      :gasto="editar.gasto.unico"
      @salvar="salvarUnico"
      @close="() => editar.modal.unico = false"
    ></modal-edit-gasto-unico>

    <modal-add-gasto-mensal
      :show="adicionar.modal.mensal"
      @salvar="addMensal"
      @close="() => adicionar.modal.mensal = false"
    ></modal-add-gasto-mensal>

    <modal-edit-gasto-mensal
      :show="editar.modal.mensal"
      :gasto="editar.gasto.mensal"
      @salvar="salvarMensal"
      @close="() => editar.modal.mensal = false"
    ></modal-edit-gasto-mensal>

  </q-page>
</template>

<script>
import contaList from '../components/conta-list'
import modalAddGastoUnico from '../components/modal-add-gasto-unico'
import modalEditGastoUnico from '../components/modal-edit-gasto-unico'
import modalAddGastoMensal from '../components/modal-add-gasto-mensal'
import modalEditGastoMensal from '../components/modal-edit-gasto-mensal'
import btnAddConta from '../components/btn-add-conta'
import { unicosStore, mensaisStore } from '../persistence/gastos'

export default {
  name: 'PageIndex',
  mounted () {
    this.carregarDados()
  },
  data () {
    return {
      data: {
        mes: (new Date()).getMonth() + 1,
        ano: (new Date()).getFullYear()
      },
      adicionar: {
        modal: {
          unico: false,
          mensal: false,
          cartao: false
        }
      },
      editar: {
        gasto: {
          unico: {},
          mensal: {},
          cartao: {}
        },
        modal: {
          unico: false,
          mensal: false,
          cartao: false
        }
      }
    }
  },
  methods: {
    inserirUnico () {
      this.adicionar.modal.unico = true
    },
    inserirMensal () {
      this.adicionar.modal.mensal = true
    },
    inserirCartao () {
      this.adicionar.modal.cartao = true
    },
    addUnico (gasto) {
      this.$store.dispatch('gastos/addUnico', {
        gasto: Object.assign(gasto, this.data)
      })
    },
    async salvarUnico (gasto) {
      await unicosStore.setItem(gasto.id, gasto)
      this.carregarDados()
    },
    deletarUnico (gastoId) {
      this.confirmarDeletar().then(async () => {
        await unicosStore.removeItem(gastoId)
        this.carregarDados()
      }).catch(() => {})
    },
    addMensal (gasto) {
      this.$store.dispatch('gastos/addMensal', {
        gasto
      })
    },
    async salvarMensal (gasto) {
      await mensaisStore.setItem(gasto.id, gasto)
      this.carregarDados(true)
    },
    deletarMensal (gastoId) {
      this.confirmarDeletar().then(async () => {
        await mensaisStore.removeItem(gastoId)
        this.carregarDados(true)
      }).catch(() => {})
    },
    addCartao (gasto) {
      this.$store.dispatch('gastos/addCartao', {
        gasto: Object.assign(gasto, this.data)
      })
    },
    async editarUnico (gastoId) {
      this.editar.gasto.unico = await unicosStore.getItem(gastoId)
      this.editar.modal.unico = true
    },
    async editarMensal (gastoId) {
      this.editar.gasto.mensal = await mensaisStore.getItem(gastoId)
      this.editar.modal.mensal = true
    },
    editarCartao (gasto) {
      this.editar.gasto = gasto
      this.editar.modal.cartao = true
    },
    confirmarDeletar () {
      return this.$q.dialog({
        title: 'Atenção!',
        message: 'Tem certeza que deseja deletar o gasto?',
        ok: {
          label: 'Deletar',
          color: 'red'
        },
        cancel: 'Cancelar'
      })
    },
    anterior () {
      if (this.data.mes === 1) {
        this.data.ano--
        this.data.mes = 12
        return
      }
      this.data.mes--
      this.carregarDados()
    },
    proximo () {
      if (this.data.mes === 12) {
        this.data.ano++
        this.data.mes = 1
        return
      }
      this.data.mes++
      this.carregarDados()
    },
    async carregarDados (force = false) {
      this.$q.loading.show({
        delay: 0,
        message: 'Carregando gastos...'
      })
      await this.$store.dispatch('gastos/carregar', {
        data: this.data,
        force
      })
      this.$q.loading.hide()
    }
  },
  components: {
    contaList,
    modalAddGastoUnico,
    modalEditGastoUnico,
    btnAddConta,
    modalAddGastoMensal,
    modalEditGastoMensal
  }
}
</script>
