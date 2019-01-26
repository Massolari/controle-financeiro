<template>
  <q-page>
    <conta-list
      :data="data"
      @anterior="anterior"
      @proximo="proximo"
      @editarUnico="editarUnico"
      @deletarUnico="deletarUnico"
      @editarMensal="editarMensal"
      @deletarMensal="deletarMensal"
      @editarCartao="editarCartao"
      @deletarCartao="deletarCartao"
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

    <modal-add-gasto-cartao
      :show="adicionar.modal.cartao"
      @salvar="addCartao"
      @close="() => adicionar.modal.cartao = false"
    ></modal-add-gasto-cartao>

    <modal-edit-gasto-cartao
      :show="editar.modal.cartao"
      :gasto="editar.gasto.cartao"
      @salvar="salvarCartao"
      @close="() => editar.modal.cartao = false"
    ></modal-edit-gasto-cartao>
  </q-page>
</template>

<script>
import contaList from '../components/conta-list'
import modalAddGastoUnico from '../components/modal-add-gasto-unico'
import modalEditGastoUnico from '../components/modal-edit-gasto-unico'
import modalAddGastoMensal from '../components/modal-add-gasto-mensal'
import modalEditGastoMensal from '../components/modal-edit-gasto-mensal'
import modalAddGastoCartao from '../components/modal-add-gasto-cartao'
import modalEditGastoCartao from '../components/modal-edit-gasto-cartao'
import btnAddConta from '../components/btn-add-conta'
import { mensaisStore, cartaoStore } from '../persistence/gastos'

export default {
  name: 'PageIndex',
  mounted () {
    this.carregarGastos()
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
    abrirMenu () {
      this.menuAberto = true
      console.log(this.menuAberto)
    },
    inserirUnico () {
      this.adicionar.modal.unico = true
    },
    inserirMensal () {
      this.adicionar.modal.mensal = true
    },
    inserirCartao () {
      this.carregarCartoes()
      if (this.$store.state.cartoes.cartoes.length === 0) {
        this.$q.dialog({
          title: 'Atenção!',
          message: 'Primeiro você deve cadastrar um cartão!'
        })
        return
      }
      this.adicionar.modal.cartao = true
    },
    addUnico (gasto) {
      this.$store.dispatch('gastos/addUnico', Object.assign(gasto, this.data)).then(() => {
        this.$q.notify({
          message: 'Gasto único incluído com sucesso!',
          color: 'positive',
          position: 'top-right'
        })
      })
      this.adicionar.modal.unico = false
    },
    async salvarUnico (gasto) {
      await this.$store.dispatch('gastos/updateUnico', Object.assign(gasto, this.data))
      this.editar.modal.unico = false
      this.carregarGastos()
    },
    deletarUnico (gastoId) {
      this.confirmarDeletar().then(async () => {
        await this.$store.dispatch('gastos/deleteUnico', {
          gastoId,
          data: this.data
        })
        this.carregarGastos()
      }).catch(() => {})
    },
    addMensal (gasto) {
      this.$store.dispatch('gastos/addMensal', {
        gasto
      })
      this.adicionar.modal.mensal = false
    },
    async salvarMensal (gasto) {
      await mensaisStore.setItem(gasto.id, gasto)
      this.editar.modal.mensal = false
      this.carregarGastos(true)
    },
    deletarCartao (gastoId) {
      this.confirmarDeletar().then(async () => {
        await cartaoStore.removeItem(gastoId)
        this.carregarGastos(true)
      }).catch(() => {})
    },
    async salvarCartao (gasto) {
      await cartaoStore.setItem(gasto.id, gasto)
      this.editar.modal.cartao = false
      this.carregarGastos(true)
    },
    deletarMensal (gastoId) {
      this.confirmarDeletar().then(async () => {
        await mensaisStore.removeItem(gastoId)
        this.carregarGastos(true)
      }).catch(() => {})
    },
    addCartao (gasto) {
      this.$store.dispatch('gastos/addCartao', Object.assign(gasto, this.data))
      this.adicionar.modal.cartao = false
    },
    async editarUnico (gastoId) {
      this.editar.gasto.unico = this.$store.state.gastos.unicos.find(g => g.id === gastoId)
      this.editar.modal.unico = true
    },
    async editarMensal (gastoId) {
      this.editar.gasto.mensal = await mensaisStore.getItem(gastoId)
      this.editar.modal.mensal = true
    },
    async editarCartao (gastoId) {
      this.carregarCartoes()
      if (this.$store.state.cartoes.cartoes.length === 0) {
        this.$q.dialog({
          title: 'Atenção!',
          message: 'Primeiro você deve cadastrar um cartão!'
        })
        return
      }
      this.editar.gasto.cartao = await cartaoStore.getItem(gastoId)
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
      } else {
        this.data.mes--
      }
      this.carregarGastos()
    },
    proximo () {
      if (this.data.mes === 12) {
        this.data.ano++
        this.data.mes = 1
      } else {
        this.data.mes++
      }
      this.carregarGastos()
    },
    async carregarGastos (force = false) {
      this.$q.loading.show({
        delay: 0,
        message: 'Carregando gastos...'
      })
      await this.$store.dispatch('gastos/carregar', {
        data: this.data,
        force
      })
      this.$q.loading.hide()
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
    }
  },
  components: {
    contaList,
    btnAddConta,
    modalAddGastoUnico,
    modalEditGastoUnico,
    modalAddGastoMensal,
    modalEditGastoMensal,
    modalAddGastoCartao,
    modalEditGastoCartao
  }
}
</script>
