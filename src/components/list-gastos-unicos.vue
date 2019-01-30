<template>
  <q-collapsible :opened="totalUnicos > 0" :disable="totalUnicos === 0">
      <template slot="header">
        <q-item-side left>
          <q-icon name="attach_money" color="secondary" size="24px"/>
        </q-item-side>
        <q-item-main :label="`Únicos (${toMoney(totalUnicos)})`" />
      </template>
      <q-item :key="u.id" v-for="u in unicos">
        <q-item-main :label="toMoney(u.valor)" :sublabel="u.desc" @click.native="editar(u.id)"/>
        <q-item-side right>
          <q-btn
              icon="delete"
              round
              outline
              text-color="red"
              size="md"
              @click="deletar(u.id)"
          />
          <!-- <q-btn -->
          <!--     icon="create" -->
          <!--     round -->
          <!--     outline -->
          <!--     text-color="blue" -->
          <!--     size="md" -->
          <!--     @click="editar(u.id)" -->
          <!-- /> -->
        </q-item-side>
      </q-item>
    </q-collapsible>
</template>

<script>
export default {
  name: 'ListGastosUnicos',
  data () {
    return {}
  },
  methods: {
    toMoney (value) {
      return this.$store.getters['util/toMoney'](value)
    },
    editar (id) {
      this.$emit('editar', id)
    },
    deletar (id) {
      this.$emit('deletar', id)
    }
  },
  computed: {
    unicos () {
      return this.$store.state.gastos.unicos
    },
    totalUnicos () {
      return this.$store.getters['gastos/totalUnicos']
    }
  }
}
</script>

<style>
</style>
