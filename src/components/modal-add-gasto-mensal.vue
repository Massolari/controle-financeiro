<template>
  <q-dialog
    v-model="myShow"
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
        <q-btn color="primary" label="Adicionar" @click="adicionar" />
      </template>
    </q-dialog>
</template>

<script>
import { required, minValue } from 'vuelidate/lib/validators'

export default {
  props: ['show', 'mensagem'],
  data () {
    return {
      myShow: false,
      conta: {
        desc: '',
        valor: 0,
        vencimento: 1
      },
      dias: [
        {
          label: '1',
          value: 1
        },
        {
          label: '2',
          value: 2
        },
        {
          label: '3',
          value: 3
        },
        {
          label: '4',
          value: 4
        },
        {
          label: '5',
          value: 5
        },
        {
          label: '6',
          value: 6
        },
        {
          label: '7',
          value: 7
        },
        {
          label: '8',
          value: 8
        },
        {
          label: '9',
          value: 9
        },
        {
          label: '10',
          value: 10
        },
        {
          label: '11',
          value: 11
        },
        {
          label: '12',
          value: 12
        },
        {
          label: '13',
          value: 13
        },
        {
          label: '14',
          value: 14
        },
        {
          label: '15',
          value: 15
        },
        {
          label: '16',
          value: 16
        },
        {
          label: '17',
          value: 17
        },
        {
          label: '18',
          value: 18
        },
        {
          label: '19',
          value: 19
        },
        {
          label: '20',
          value: 20
        },
        {
          label: '21',
          value: 21
        },
        {
          label: '22',
          value: 22
        },
        {
          label: '23',
          value: 23
        },
        {
          label: '24',
          value: 24
        },
        {
          label: '25',
          value: 25
        },
        {
          label: '26',
          value: 26
        },
        {
          label: '27',
          value: 27
        },
        {
          label: '28',
          value: 28
        },
        {
          label: '29',
          value: 29
        },
        {
          label: '30',
          value: 30
        },
        {
          label: '31',
          value: 31
        }
      ]
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
    },
    limparCampos () {
      this.conta.desc = ''
      this.conta.valor = ''
      this.conta.vencimento = 1
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
