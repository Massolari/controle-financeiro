<template>
  <q-dialog
    v-model="show"
    @hide="close"
    prevent-close
    >
      <span slot="title">Editar gasto único</span>

      <div slot="body">
        <q-field class="distance">
          <q-input
            v-model="myGasto.desc"
            float-label="Descrição"
            placeholder="Ex.: Hambúrguer"
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
  props: ['show', 'close', 'gasto'],
  data () {
    return {
      myGasto: {
        id: '',
        desc: '',
        valor: 0
      }
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
    }
  }
}
</script>
<style>
    .distance {
        padding: 5px;
    }
</style>
