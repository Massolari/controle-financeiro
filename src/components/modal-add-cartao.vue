<template>
  <q-dialog
    v-model="myShow"
    prevent-close
    >
      <span slot="title">Adicionar cartão</span>

      <div slot="body">
        <q-field class="distance">
          <q-input
            v-model="cartao.nome"
            float-label="Nome"
            placeholder="Ex.: Mastercard"
            :error="$v.cartao.nome.$error"
            @blur="$v.cartao.nome.$touch"
          />
        </q-field>
        <!-- <q-field class="distance"> -->
        <!--   <q-input -->
        <!--     v-model="cartao.limite" -->
        <!--     type="number" -->
        <!--     :decimals="2" -->
        <!--     :step="1.4" -->
        <!--     prefix="R$ " -->
        <!--     float-label="Limite" -->
        <!--     :error="$v.cartao.limite.$error" -->
        <!--     @blur="$v.cartao.limite.$touch" -->
        <!--   /> -->
        <!-- </q-field> -->

        <q-field class="distance">
          <q-select
            float-label="Dia de fechamento da fatura"
            v-model="cartao.vira"
            :options="dias"
          />
        </q-field>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn flat label="Cancelar" @click="cancel" />
        <q-btn color="primary" label="Adicionar" @click="adicionar" />
      </template>
    </q-dialog>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

export default {
  props: ['show'],
  data () {
    return {
      myShow: false,
      cartao: {
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
      this.limparCampos()
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
    cartao: {
      nome: { required }
      // limite: {
      //   required,
      //   minValue: minValue(0.01)
      // }
    }
  },
  methods: {
    adicionar () {
      this.$v.cartao.$touch()
      if (this.$v.cartao.$error) {
        this.$q.notify({
          message: 'Nome e limite devem estar preenchidos!',
          position: 'top'
        })
        return
      }
      this.$emit('salvar', Object.assign({}, this.cartao))
      this.myShow = false
    },
    cancel () {
      this.myShow = false
    },
    limparCampos () {
      this.cartao.nome = ''
      this.cartao.limite = 0
      this.cartao.vira = 1
      this.$v.cartao.$reset()
    }
  }
}
</script>

<style>
    .distance {
        padding: 5px;
    }
</style>
