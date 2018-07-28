<template>
  <q-page padding>
    <conta-list
      :data="data"
      @anterior="anterior"
      @proximo="proximo"
    ></conta-list>

    <btn-add-conta
      @addUnico="inserirUnico"
      @addMensal="inserirMensal"
      @addCartao="inserirCartao"
    ></btn-add-conta>

    <modal-add-gasto-unico
      :show="addModalUnico"
      @salvar="addUnico"
      @close="() => addModalUnico = false"
    ></modal-add-gasto-unico>

    <modal-add-gasto-mensal
      :show="addModalMensal"
      @salvar="addMensal"
      @close="() => addModalMensal = false"
    ></modal-add-gasto-mensal>
  </q-page>
</template>

<script>
import contaList from '../components/conta-list'
import modalAddGastoUnico from '../components/modal-add-gasto-unico'
import modalAddGastoMensal from '../components/modal-add-gasto-mensal'
import btnAddConta from '../components/btn-add-conta'

export default {
  name: 'PageIndex',
  mounted () {
    this.carregarDados()
  },
  data () {
    return {
      addModalUnico: false,
      addModalMensal: false,
      addModalCartao: false,
      data: {
        mes: (new Date()).getMonth() + 1,
        ano: (new Date()).getFullYear()
      }
    }
  },
  methods: {
    inserirUnico () {
      this.addModalUnico = true
    },
    inserirMensal () {
      this.addModalMensal = true
    },
    inserirCartao () {
      this.addModalCartao = true
    },
    addUnico (gasto) {
      this.$store.dispatch('gastos/addUnico', {
        gasto: Object.assign(gasto, this.data)
      })
    },
    addMensal (gasto) {
      this.$store.dispatch('gastos/addMensal', {
        gasto
      })
    },
    addCartao (gasto) {
      this.$store.dispatch('gastos/addCartao', {
        gasto: Object.assign(gasto, this.data)
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
    async carregarDados () {
      this.$q.loading.show({
        delay: 0,
        message: 'Carregando gastos...'
      })
      await this.$store.dispatch('gastos/carregar', this.data)
      this.$q.loading.hide()
    }
  },
  components: {
    contaList,
    modalAddGastoUnico,
    btnAddConta,
    modalAddGastoMensal
  }
}
</script>
