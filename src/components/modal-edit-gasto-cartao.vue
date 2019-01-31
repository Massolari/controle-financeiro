<template>
  <q-dialog
    :value="show"
    prevent-close
    >
      <span slot="title">Editar gasto no cartão</span>
      <div slot="body">
        <q-field class="distance">
          <q-select
            float-label="Cartão"
            v-model="myGasto.cartao"
            :options="cartoes"
            @input="calcularLimite"
          />
        </q-field>
        <!-- <q-field class="distance"> -->
        <!--   <q-input -->
        <!--     :value="limiteCartao" -->
        <!--     float-label="Limite disponível" -->
        <!--     prefix="R$ " -->
        <!--     :disable="true" -->
        <!--   /> -->
        <!-- </q-field> -->
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
            ref="valor"
            v-money="{}"
            prefix="R$ "
            float-label="Valor da parcela"
            :error="$v.myGasto.valor.$error"
            @blur="$v.myGasto.valor.$touch"
          />
        </q-field>
        <q-field class="distance">
          <q-input
            v-model="myGasto.parcelas"
            type="number"
            float-label="Parcelas"
            :error="$v.myGasto.parcelas.$error"
            @blur="$v.myGasto.parcelas.$touch"
          />
        </q-field>
        <q-field class="distance">
          <q-input
            :value="total"
            float-label="Valor total"
            :disable="true"
          />
        </q-field>
        <q-field class="distance">
          <q-select
            float-label="Mês da primeira parcela"
            v-model="myGasto.mes"
            :options="meses"
          />
        </q-field>
        <q-field class="distance">
          <q-input
            v-model="myGasto.ano"
            float-label="Ano da primeira parcela"
            @input="validarAno"
            :error="$v.myGasto.ano.$error"
            @blur="$v.myGasto.ano.$touch"
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
import { required, minValue, minLength, maxLength } from 'vuelidate/lib/validators'
import Vue from 'vue'

export default {
  props: ['show', 'gasto'],
  data () {
    return {
      myGasto: {
        desc: '',
        valor: 0,
        parcelas: 1,
        vencimento: 1,
        mes: this.$store.state.util.mes,
        ano: this.$store.state.util.ano,
        cartao: ''
      },
      cartoes: [],
      limiteCartao: 0
    }
  },
  computed: {
    total () {
      return this.$store.getters['toMoneyFromNumber']((this.$store.getters['toNumber'](this.myGasto.valor) * this.myGasto.parcelas) || 0)
    },
    data () {
      return this.$store.state.data
    },
    meses () {
      return this.$store.state.util.meses
    },
    cartaoSelecionado () {
      return this.$store.state.cartoes.cartoes.find(c => c.id === this.myGasto.cartao)
    }
  },
  watch: {
    gasto (newValue) {
      if (newValue) {
        this.myGasto = Object.assign({}, newValue)
        this.$refs.valor.$el.getElementsByTagName('input')[0].value = this.myGasto.valor
      }
    },
    show (newValue) {
      this.cartoes = this.$store.state.cartoes.cartoes.map(c => ({ label: c.nome, value: c.id }))
      // this.calcularLimite()
    }
  },
  validations: {
    myGasto: {
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
      this.myGasto.ano = Number(this.myGasto.ano)
      this.$emit('salvar', {
        novo: Object.assign({}, this.myGasto),
        antigo: Object.assign({}, this.gasto)
      })
    },
    validarAno () {
      const anoString = String(this.myGasto.ano)
      if (anoString.length > 4 || isNaN(anoString)) {
        Vue.nextTick(() => {
          const tratado = parseInt(anoString.substr(0, 4))
          this.myGasto.ano = (isNaN(tratado)) ? '' : tratado // Para verificar se apos o tratamento ele ficou com valor NaN
        })
      }
    },
    calcularLimite () {
      if (!this.myGasto.cartao) {
        this.limiteCartao = 0
      }
      this.$store.getters['cartoes/limiteDisponivel']({
        cartao: this.cartaoSelecionado,
        data: this.$store.state.data
      }).then(limite => {
        this.limiteCartao = limite
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
