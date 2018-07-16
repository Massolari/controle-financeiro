import Vue from 'vue'
import Vuex from 'vuex'

import gastos from './gastos'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    gastos
  }
})

export default store
