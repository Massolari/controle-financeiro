<template>
  <q-modal
    :value="show"
    @hide="close"
    @show="limparCampos"
    maximized
    >
      <span>Adicionar gasto único</span>

      <div>
        <q-field class="distance">
          <q-input
            v-model="conta.desc"
            float-label="Descrição"
            placeholder="Ex.: Hambúrguer"
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

      <q-btn flat label="Cancelar" @click="close" />
      <q-btn color="primary" label="Adicionar" @click="adicionar" />
    </q-modal>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  props: ['show', 'close'],
  data () {
    return {
      conta: {
        desc: '',
        valor: 0
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
    },
    limparCampos () {
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
