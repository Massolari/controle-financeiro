<template>
  <q-page>
    <conta-list
      @mudouMes="carregarGastos"
      @editarUnico="editarUnico"
      @deletarUnico="deletarUnico"
      @editarMensal="editarMensal"
      @marcarMensal="marcarMensal"
      @desmarcarMensal="desmarcarMensal"
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
import { mensaisStore } from '../persistence/gastos'

export default {
  name: 'PageIndex',
  mounted () {
    this.carregarGastos()
    this.carregarCartoes()
  },
  data () {
    return {
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
  computed: {
    data () {
      return this.$store.state.data
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
    async inserirCartao () {
      await this.carregarCartoes()
      if (this.$store.state.cartoes.cartoes.length === 0) {
        this.$q.dialog({
          title: 'Atenção!',
          message: 'Primeiro você deve cadastrar um cartão através do menu de cartões!'
        })
        return
      }
      this.adicionar.modal.cartao = true
    },
    async addUnico (gasto) {
      await this.$store.dispatch('gastos/addUnico', Object.assign(gasto, this.data))
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
    async addMensal (gasto) {
      await this.$store.dispatch('gastos/addMensal', gasto)
      this.adicionar.modal.mensal = false
    },
    async salvarMensal (gastoOpcao) {
      await this.$store.dispatch('gastos/updateMensal', { ...gastoOpcao, data: this.data })
      this.editar.modal.mensal = false
      this.carregarGastos()
    },
    deletarMensal (gastoId) {
      this.confirmarDeletarMensal().then(async (opcao) => {
        switch (opcao) {
          case 'todos':
            await this.$store.dispatch('gastos/deleteMensal', { gastoId })
            break
          case 'este':
            await this.$store.dispatch('gastos/deleteMensalMes', {
              gastoId,
              data: this.data
            })
            break
          case 'partir':
            await this.$store.dispatch('gastos/deleteMensalPartir', {
              gastoId,
              data: this.data
            })
            break
        }
        this.carregarGastos()
      }).catch(() => {})
    },
    async addCartao (gasto) {
      await this.$store.dispatch('gastos/addCartao', gasto)
      this.adicionar.modal.cartao = false
      this.carregarGastos()
    },
    async salvarCartao (gasto) {
      await this.$store.dispatch('gastos/updateCartao', gasto)
      this.editar.modal.cartao = false
      this.carregarGastos()
    },
    deletarCartao (gasto) {
      this.confirmarDeletar().then(async () => {
        await this.$store.dispatch('gastos/deleteCartao', gasto)
        this.carregarGastos()
      }).catch(() => {})
    },
    async editarUnico (gastoId) {
      this.editar.gasto.unico = this.$store.state.gastos.unicos.find(g => g.id === gastoId)
      this.editar.modal.unico = true
    },
    async editarMensal (gastoId) {
      const gastosMes = await mensaisStore.getItem(`${this.data.ano}-${this.data.mes}`) || []
      let gasto = gastosMes.find(g => g.id === gastoId)
      if (!gasto) {
        const gastos = await mensaisStore.getItem(`gastos`) || []
        gasto = gastos.find(g => g.id === gastoId)
      }
      this.editar.gasto.mensal = gasto
      this.editar.modal.mensal = true
    },
    async editarCartao (gasto) {
      await this.carregarCartoes()
      if (this.$store.state.cartoes.cartoes.length === 0) {
        this.$q.dialog({
          title: 'Atenção!',
          message: 'Primeiro você deve cadastrar um cartão através do menu de cartões!'
        })
        return
      }
      this.editar.gasto.cartao = gasto
      this.editar.modal.cartao = true
    },
    marcarMensal (gastoId) {

    },
    desmarcarMensal (gastoId) {

    },
    confirmarDeletarMensal () {
      return this.$q.dialog({
        title: 'Atenção!',
        message: 'Como você deseja deletar o gasto?',
        ok: {
          label: 'Deletar',
          color: 'red'
        },
        cancel: 'Cancelar',
        options: {
          type: 'radio',
          model: 'este',
          items: [
            { label: 'Apenas deste mês', value: 'este' },
            { label: 'A partir deste mês em diante', value: 'partir' },
            { label: 'Todos os meses', value: 'todos' }
          ]
        }
      })
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
    async carregarGastos (force = false) {
      this.$q.loading.show({
        delay: 400,
        message: 'Carregando gastos...'
      })
      await this.$store.dispatch('gastos/carregar', {
        data: this.data,
        force
      })
      this.$q.loading.hide()
    },
    async carregarCartoes (force = false) {
      return new Promise(async (resolve) => {
        this.$q.loading.show({
          delay: 0,
          message: 'Carregando cartões...'
        })
        await this.$store.dispatch('cartoes/carregar', force)
        this.$q.loading.hide()
        resolve()
      })
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
