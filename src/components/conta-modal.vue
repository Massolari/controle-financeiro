<template>
  <q-dialog
    v-model="myShow"
    stack-buttons
    prevent-close
    @ok="onOk"
    @show="onShow"
    >
      <span slot="title">{{ mensagem }}</span>

      <div slot="body">
        <q-field class="distance">
          <q-input
            v-model="conta.desc"
            float-label="Descrição"
            placeholder="Ex.: Conta de luz"
            :error="$v.conta.desc.$error"
            @blur="$v.conta.desc.$touch"
          />
        </q-field>
        <q-field class="distance">
          <q-input
            v-model="conta.valor"
            type="number"
            :decimals="2"
            :step="1.4"
            prefix="R$ "
            float-label="Valor"
            :error="$v.conta.valor.$error"
            @blur="$v.conta.valor.$touch"
          />
        </q-field>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn color="primary" label="Adicionar" @click="onOk" />
        <q-btn flat label="Cancelar" @click="cancel" />
      </template>
    </q-dialog>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

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
  validations: {
    conta: {
      desc: { required },
      valor: {
        required,
        minValue: minValue(0.01)
      }
    }
  },
  methods: {
    onOk () {
      this.$v.conta.$touch()
      if (this.$v.conta.$error) {
        this.$q.notify({
          message: 'Descrição e valor devem estar preenchidos!',
          position: 'top'
        })
        return
      }
      this.$emit('salvar', this.conta)
      this.myShow = false
    },
    onShow () { },
    cancel () {
      this.myShow = false
      this.conta.desc = ''
      this.conta.valor = ''
      this.$v.conta.$reset()
    }
  }
}
</script>
<style>
    .distance {
        padding: 5px;
    }
</style>
