<template>
  <q-dialog
    :value="show"
    prevent-close
    >
      <span slot="title">Adicionar gasto no cartão</span>

      <div slot="body">
        <q-field class="distance">
          <q-select
            float-label="Cartão"
            v-model="gasto.cartao"
            :options="cartoes"
            @input="calcularLimite"
          />
        </q-field>
        <q-field class="distance">
          <q-input
            :value="limiteCartao"
            float-label="Limite disponível"
            prefix="R$ "
            :disable="true"
          />
        </q-field>
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
            float-label="Valor da parcela"
            :error="$v.gasto.valor.$error"
            @blur="$v.gasto.valor.$touch"
          />
        </q-field>
        <q-field class="distance">
          <q-input
            v-model="gasto.parcelas"
            type="number"
            float-label="Parcelas"
            :error="$v.gasto.parcelas.$error"
            @blur="$v.gasto.parcelas.$touch"
          />
        </q-field>
        <q-field class="distance">
          <q-input
            :value="total"
            float-label="Valor total"
            prefix="R$ "
            :disable="true"
          />
        </q-field>
        <q-field class="distance">
          <q-select
            float-label="Mês da primeira parcela"
            v-model="gasto.mes"
            :options="meses"
          />
        </q-field>
        <q-field class="distance">
          <q-input
            v-model="gasto.ano"
            float-label="Ano da primeira parcela"
            @input="validarAno"
            :error="$v.gasto.ano.$error"
            @blur="$v.gasto.ano.$touch"
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
import { required, minValue, minLength, maxLength } from 'vuelidate/lib/validators'
import Vue from 'vue'

export default {
  props: ['show'],
  data () {
    return {
      gasto: {
        desc: '',
        valor: 0,
        parcelas: 1,
        vencimento: 1,
        mes: this.$store.state.util.mes,
        ano: this.$store.state.util.ano,
        cartao: {
          id: 0,
          label: 'Selecione'
        }
      },
      cartoes: [],
      limiteCartao: 0
    }
  },
  computed: {
    total () {
      return (this.gasto.valor * this.gasto.parcelas) || 0
    },
    data () {
      return this.$store.state.data
    },
    meses () {
      return this.$store.state.util.meses
    },
    cartaoSelecionado () {
      return this.$store.state.cartoes.cartoes.find(c => c.id === this.gasto.cartao)
    }
  },
  watch: {
    show (newValue, oldValue) {
      this.limparCampos()
      if (newValue) {
        if (this.data.mes === 12) {
          this.gasto.mes = 1
          this.gasto.ano = this.data.ano + 1
        } else {
          this.gasto.mes = this.data.mes + 1
          this.gasto.ano = this.data.ano
        }
        this.cartoes = this.$store.state.cartoes.cartoes.map(c => ({ label: c.nome, value: c.id }))
      }
    }
  },
  validations: {
    gasto: {
      desc: { required },
      cartao: { required },
      parcelas: {
        required,
        minValue: minValue(1)
      },
      ano: {
        required,
        minLength: minLength(4),
        maxLength: maxLength(4)
      },
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
          message: 'Cartão, valor, parcelas e descrição devem estar preenchidos!',
          position: 'top'
        })
        return
      }
      this.$emit('salvar', Object.assign({}, this.gasto))
    },
    validarAno () {
      const anoString = String(this.gasto.ano)
      if (anoString.length > 4 || isNaN(anoString)) {
        Vue.nextTick(() => {
          const tratado = parseInt(anoString.substr(0, 4))
          this.gasto.ano = (isNaN(tratado)) ? '' : tratado // Para verificar se apos o tratamento ele ficou com valor NaN
        })
        return false
      }
    },
    calcularLimite () {
      if (!this.gasto.cartao) {
        this.limiteCartao = 0
      }
      this.$store.getters['cartoes/limiteDisponivel']({
        cartao: this.cartaoSelecionado,
        data: this.$store.state.data
      }).then(limite => {
        this.limiteCartao = limite
      })
    },
    cancel () {
      this.$emit('close')
    },
    limparCampos () {
      this.gasto.desc = ''
      this.gasto.valor = ''
      this.gasto.cartao = ''
      this.gasto.parcelas = 1
      this.limiteCartao = 0
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
