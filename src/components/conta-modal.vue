<template>
  <q-dialog
    v-model="myShow"
    stack-buttons
    prevent-close
    @ok="onOk"
    @show="onShow"
    @hide="onHide"
    >
    <!-- This or use "title" prop on <q-dialog> -->
      <span slot="title">{{ mensagem }}</span>

      <div slot="body">
        <q-field
          helper="Ex.: Conta de luz"
          :label-width="3"
          >
          <q-input v-model="conta.desc" float-label="Descrição" />
        </q-field>
        <q-field>
          <q-input v-model="conta.valor" type="number" :decimals="2" :step="1.4" prefix="R$ " float-label="Valor" />
        </q-field>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn color="primary" label="Adicionar" @click="onOk" />
        <q-btn flat label="Cancelar" @click="props.cancel" />
      </template>
    </q-dialog>
</template>

<script>
export default {
  props: ['show', 'mensagem'],
  data () {
    return {
      myShow: false,
      conta: {
        desc: '',
        valor: 0
      }
    }
  },
  watch: {
    show (newValue, oldValue) {
      this.myShow = newValue
    },
    myShow (newValue, oldValue) {
      if (newValue) {
        this.$emit('open')
      } else {
        this.$emit('close')
      }
    }
  },
  methods: {
    onOk () {
      this.$emit('salvar', this.conta)
      this.myShow = false
    },
    onShow () { },
    onHide () { }
  }
}
</script>
