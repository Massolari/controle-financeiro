<template>
  <q-dialog
    v-model="myShow"
    prevent-close
    >
      <span slot="title">Editar gasto mensal</span>

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
        <q-field class="distance">
          <q-select
            float-label="Vencimento"
            v-model="conta.vencimento"
            :options="dias"
          />
        </q-field>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn flat label="Cancelar" @click="cancel" />
        <q-btn color="secondary" label="Salvar" @click="salvar" />
      </template>
    </q-dialog>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  props: ['show', 'gasto'],
  data () {
    return {
      myShow: false,
      myGasto: {
        desc: '',
        valor: 0,
        vencimento: 1
      }
    }
  },
  computed: {
    dias () {
      return this.$store.state.util.dias
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
    },
    gasto (newValue) {
      if (newValue) {
        this.myGasto = newValue
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
    adicionar () {
      this.$v.conta.$touch()
      if (this.$v.conta.$error) {
        this.$q.notify({
          message: 'Descrição e valor devem estar preenchidos!',
          position: 'top'
        })
        return
      }
      this.$emit('salvar', Object.assign({}, this.conta))
      this.myShow = false
    },
    cancel () {
      this.myShow = false
    }
  }
}
</script>
<style>
    .distance {
        padding: 5px;
    }
</style>
