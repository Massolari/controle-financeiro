<template>
  <q-page padding>
    <conta-list></conta-list>
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
  data () {
    return {
      addModalUnico: false,
      addModalMensal: false,
      addModalCartao: false,
      data: {
        mes: (new Date()).getMonth(),
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
      this.$store.commit('gastos/ADD_UNICO', Object.assign(gasto, this.data))
    },
    addMensal (gasto) {
      this.$store.commit('gastos/ADD_MENSAL', Object.assign(gasto, this.data))
    },
    addCartao (gasto) {
      this.$store.commit('gastos/ADD_CARTAO', Object.assign(gasto, this.data))
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
