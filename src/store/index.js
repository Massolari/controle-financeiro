import Vue from 'vue'
import Vuex from 'vuex'

import gastos from './gastos'
import cartoes from './cartoes'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    gastos,
    cartoes
  }
})

export default store
