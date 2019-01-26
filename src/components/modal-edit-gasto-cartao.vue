<template>
  <q-dialog
    :value="show"
    prevent-close
    >
      <span slot="title">Editar gasto no cartão</span>

      <div slot="body">
        <q-field class="distance">
          <q-input
            v-model="myGasto.desc"
            float-label="Descrição"
            placeholder="Ex.: Geladeira"
            :error="$v.myGasto.desc.$error"
            @blur="$v.myGasto.desc.$touch"
          />
        </q-field>
        <q-field class="distance">
          <q-input
            v-model="myGasto.valor"
            type="number"
            :decimals="2"
            :step="1.4"
            prefix="R$ "
            float-label="Valor"
            :error="$v.myGasto.valor.$error"
            @blur="$v.myGasto.valor.$touch"
          />
        </q-field>
        <q-field class="distance">
          <q-select
            float-label="Cartão"
            v-model="myGasto.cartao"
            :options="cartoes"
          />
        </q-field>
      </div>

      <template slot="buttons" slot-scope="props">
        <q-btn flat label="Cancelar" @click="close" />
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
      myGasto: {
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
    gasto (newValue) {
      if (newValue) {
        this.myGasto = newValue
      }
    }
  },
  validations: {
    myGasto: {
      desc: { required },
      valor: {
        required,
        minValue: minValue(0.01)
      }
    }
  },
  methods: {
    salvar () {
      this.$v.myGasto.$touch()
      if (this.$v.myGasto.$error) {
        this.$q.notify({
          message: 'Descrição e valor devem estar preenchidos!',
          position: 'top'
        })
        return
      }
      this.$emit('salvar', Object.assign({}, this.myGasto))
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
