<template>
  <q-dialog
    v-model="_myShow"
    prevent-close
    >
      <span slot="title">Adicionar gasto único</span>

      <div slot="body">
        <q-field class="distance">
          <q-input
            v-model="_gasto.desc"
            float-label="Descrição"
            placeholder="Ex.: Hambúrguer"
            :error="$v._gasto.desc.$error"
            @blur="$v._gasto.desc.$touch"
          />
        </q-field>
        <q-field class="distance">
          <q-input
            v-model="_gasto.valor"
            type="number"
            :decimals="2"
            :step="1.4"
            prefix="R$ "
            float-label="Valor"
            :error="$v._gasto.valor.$error"
            @blur="$v._gasto.valor.$touch"
          />
        </q-field>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn flat label="Cancelar" @click="cancel" />
        <q-btn color="primary" label="Salvar" @click="salvar" />
      </template>
    </q-dialog>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  props: ['show', 'gasto'],
  data () {
    return {
      _myShow: false,
      _gasto: {
        id: '',
        desc: '',
        valor: 0
      }
    }
  },
  watch: {
    show (newValue, oldValue) {
      this._myShow = newValue
    },
    _myShow (newValue, oldValue) {
      if (newValue) {
        this.$emit('open')
      } else {
        this.$emit('close')
      }
    },
    gasto (newValue) {
      if (newValue) {
        this._gasto = newValue
      }
    }
  },
  validations: {
    _gasto: {
      desc: { required },
      valor: {
        required,
        minValue: minValue(0.01)
      }
    }
  },
  methods: {
    salvar () {
      this.$v._gasto.$touch()
      if (this.$v._gasto.$error) {
        this.$q.notify({
          message: 'Descrição e valor devem estar preenchidos!',
          position: 'top'
        })
        return
      }
      this.$emit('salvar', Object.assign({}, this._gasto))
      this._myShow = false
    },
    cancel () {
      this._myShow = false
    }
  }
}
</script>
<style>
    .distance {
        padding: 5px;
    }
</style>
