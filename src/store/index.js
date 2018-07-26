import Vue from 'vue'
import Vuex from 'vuex'

import gastos from './gastos'
import cartoes from './cartoes'
import util from './util'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    gastos,
    cartoes,
    util
  }
})

export default store
