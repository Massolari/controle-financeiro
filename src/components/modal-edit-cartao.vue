<template>
  <q-dialog
    v-model="myShow"
    prevent-close
    >
      <span slot="title">Editar cartão</span>

      <div slot="body">
        <q-field class="distance">
          <q-input
            v-model="myCartao.nome"
            float-label="Nome"
            placeholder="Ex.: Mastercard"
            :error="$v.myCartao.nome.$error"
            @blur="$v.myCartao.nome.$touch"
          />
        </q-field>
        <q-field class="distance">
          <q-input
            v-model="myCartao.limite"
            type="number"
            :decimals="2"
            :step="1.4"
            prefix="R$ "
            float-label="Limite"
            :error="$v.myCartao.limite.$error"
            @blur="$v.myCartao.limite.$touch"
          />
        </q-field>

        <q-field class="distance">
          <q-select
            float-label="Dia que o cartão vira"
            v-model="myCartao.vira"
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
  props: ['show', 'cartao'],
  data () {
    return {
      myShow: false,
      myCartao: {
        nome: '',
        limite: 0,
        vira: 1
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
    cartao (newValue) {
      if (newValue) {
        this.myCartao = newValue
      }
    }
  },
  validations: {
    myCartao: {
      nome: { required },
      limite: {
        required,
        minValue: minValue(0.01)
      }
    }
  },
  methods: {
    salvar () {
      this.$v.myCartao.$touch()
      if (this.$v.myCartao.$error) {
        this.$q.notify({
          message: 'Nome e limite devem estar preenchidos!',
          position: 'top'
        })
        return
      }
      this.$emit('salvar', Object.assign({}, this.myCartao))
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
