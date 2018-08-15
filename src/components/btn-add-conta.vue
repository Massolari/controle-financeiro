<template>
  <q-layout>
    <q-btn
      round
      color="primary"
      @click="open"
      class="fixed"
      icon="add"
      style="right: 18px; bottom: 18px"
      size="lg"
    />

    <q-action-sheet
      v-model="opened"
      title="Novo gasto..."
      :grid="true"
      :actions="menu"
      @hide="() => opened = false"
    />
  </q-layout>
</template>

<script>
export default {
  name: 'BtnAddConta',
  data () {
    return {
      opened: false,
      menu: [
        {
          label: 'Unico',
          icon: 'attach_money',
          color: 'secondary',
          handler: this.addUnico
        },
        {
          label: 'Mensal',
          icon: 'calendar_today',
          color: 'purple',
          handler: this.addMensal
        },
        {
          label: 'No cartão',
          icon: 'credit_card',
          color: 'red',
          handler: this.addCartao
        }
      ]
    }
  },
  methods: {
    open () {
      this.opened = true
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
