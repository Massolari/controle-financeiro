<template>
  <q-dialog
    :value="show"
    prevent-close
    >
      <span slot="title">Adicionar gasto mensal</span>

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
            ref="valor"
            v-money="{}"
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
        <q-btn flat label="Cancelar" @click="close" />
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
      conta: {
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
  validations: {
    conta: {
      desc: { required },
      valor: {
        required
      }
    }
  },
  watch: {
    show (newValue) {
      if (newValue) {
        this.limparCampos()
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
    },
    limparCampos () {
      this.conta.desc = ''
      this.$refs.valor.$el.getElementsByTagName('input')[0].value = 0
      this.conta.valor = 0
      this.conta.vencimento = 1
      this.$v.conta.$reset()
    },
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style>
    .distance {
        padding: 5px;
    }
</style>
