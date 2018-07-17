<template>
  <q-fab
    class="fixed"
    style="right: 18px; bottom: 18px"
    color="primary"
    direction="up"
    icon="add"
    @show="showTooltips"
    @hide="hideTooltips"
    >

    <q-fab-action @click="addCartao" color="red" icon="credit_card">
      <q-tooltip :value="tooltips" anchor="center left" self="center right" :offset="[20, 20]">Gasto no cartão</q-tooltip>
    </q-fab-action>
    <q-fab-action @click="addMensal" color="purple" icon="calendar_today">
      <q-tooltip :value="tooltips" anchor="center left" self="center right" :offset="[20, 0]">Gasto mensal</q-tooltip>
    </q-fab-action>
    <q-fab-action @click="addUnico" color="secondary" icon="attach_money">
      <q-tooltip ref="ttpUnico" :value="tooltips" anchor="center left" self="center right" :offset="[20, 0]">Gasto único</q-tooltip>
    </q-fab-action>
  </q-fab>

</template>

<script>
export default {
  name: 'BtnAddConta',
  data () {
    return {
      tooltips: false,
      opened: false
    }
  },
  methods: {
    showTooltips () {
      this.opened = true
      setTimeout(() => {
        if (this.opened) {
          this.tooltips = true
        }
      }, 500)
    },
    hideTooltips () {
      this.opened = false
      this.tooltips = false
    },
    addUnico () {
      this.$emit('addUnico')
    },
    addMensal () {
      this.$emit('addMensal')
    },
    addCartao () {
      this.$emit('addCartao')
    }
  }
}
</script>

<style>
</style>
