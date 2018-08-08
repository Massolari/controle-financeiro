<template>
  <q-dialog
    v-model="myShow"
    prevent-close
    >
      <span slot="title">Adicionar gasto no cartão</span>

      <div slot="body">
        <q-field class="distance">
          <q-input
            v-model="gasto.desc"
            float-label="Descrição"
            placeholder="Ex.: Geladeira"
            :error="$v.gasto.desc.$error"
            @blur="$v.gasto.desc.$touch"
          />
        </q-field>
        <q-field class="distance">
          <q-input
            v-model="gasto.valor"
            type="number"
            :decimals="2"
            :step="1.4"
            prefix="R$ "
            float-label="Valor"
            :error="$v.gasto.valor.$error"
            @blur="$v.gasto.valor.$touch"
          />
        </q-field>
        <q-field class="distance">
          <q-select
            float-label="Cartão"
            v-model="gasto.cartao"
            :options="cartoes"
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
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  props: ['show'],
  data () {
    return {
      myShow: false,
      gasto: {
        desc: '',
        valor: 0,
        vencimento: 1
      }
    }
  },
  computed: {
    cartoes () {
      return this.$store.state.cartoes.cartoes.map(c => ({ label: c.nome, value: c.id }))
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
    gasto: {
      desc: { required },
      valor: {
        required,
        minValue: minValue(0.01)
      }
    }
  },
  methods: {
    adicionar () {
      this.$v.gasto.$touch()
      if (this.$v.gasto.$error) {
        this.$q.notify({
          message: 'Descrição e valor devem estar preenchidos!',
          position: 'top'
        })
        return
      }
      this.$emit('salvar', Object.assign({}, this.gasto))
      this.myShow = false
    },
    cancel () {
      this.myShow = false
    },
    limparCampos () {
      this.gasto.desc = ''
      this.gasto.valor = ''
      this.gasto.cartao = ''
      this.$v.gasto.$reset()
    }
  }
}
</script>
<style>
    .distance {
        padding: 5px;
    }
</style>
