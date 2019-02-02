<template>
  <q-dialog
    :value="show"
    prevent-close
    >
      <span slot="title">Editar gasto mensal</span>

      <div slot="body">
        <q-field class="distance">
          <q-radio v-model="opcao" val="este" label="Apenas este mês" />
          <q-radio v-model="opcao" val="partir" label="A partir deste mês"/>
        </q-field>
        <q-field class="distance">
          <q-input
            v-model="myGasto.desc"
            float-label="Descrição"
            placeholder="Ex.: Conta de luz"
            :error="$v.myGasto.desc.$error"
            @blur="$v.myGasto.desc.$touch"
          />
        </q-field>
        <q-field class="distance">
          <q-input
            v-model="myGasto.valor"
            ref="valor"
            v-money="{}"
            prefix="R$ "
            float-label="Valor"
            :error="$v.myGasto.valor.$error"
            @blur="$v.myGasto.valor.$touch"
          />
        </q-field>
        <q-field class="distance">
          <q-select
            float-label="Vencimento"
            v-model="myGasto.vencimento"
            :options="dias"
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
import { required } from 'vuelidate/lib/validators'

export default {
  props: ['show', 'gasto'],
  data () {
    return {
      myGasto: {
        desc: '',
        valor: 0,
        vencimento: 1
      },
      opcao: 'este'
    }
  },
  computed: {
    dias () {
      return this.$store.state.util.dias
    }
  },
  watch: {
    gasto (newValue) {
      if (newValue) {
        this.myGasto = Object.assign({}, newValue)
        this.$refs.valor.$el.getElementsByTagName('input')[0].value = this.myGasto.valor * 100
      }
    }
  },
  validations: {
    myGasto: {
      desc: { required },
      valor: { required }
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
      this.$emit('salvar', {
        gasto: Object.assign({}, this.myGasto),
        opcao: this.opcao
      })
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
