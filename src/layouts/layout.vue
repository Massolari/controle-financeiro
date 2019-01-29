<template>
  <q-layout view="hHh lpr lfr"> <!-- Be sure to play with the Layout demo on docs -->

    <!-- (Optional) The Header -->
    <q-layout-header>
      <q-toolbar
         color="dark"
          >
        <q-btn
          flat
          round
          dense
          icon="menu"
          @click="leftDrawer = !leftDrawer"
        />
        <q-toolbar-title>
          Meus gastos
          <!-- <span slot="subtitle">Situação: Tranquilo</span> -->
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer
      v-model="leftDrawer"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        inset-delimiter
      >
        <!-- <q-list-header>Opções</q-list-header> -->
        <q-item exact to="/">
          <q-item-side icon="attach_money" />
          <q-item-main label="Resumo" sublabel="Gastos por mês" />
        </q-item>
        <q-item to="/cartao">
          <q-item-side icon="credit_card" />
          <q-item-main label="Cartões de crédito" sublabel="Gerencie seus cartões" />
        </q-item>
      </q-list>
    </q-layout-drawer>

    <q-page-container>
      <!-- This is where pages get injected -->
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script>
export default {
  // name: 'LayoutName',
  data () {
    return {
      leftDrawer: true
    }
  }
}
</script>

<style>
</style>
