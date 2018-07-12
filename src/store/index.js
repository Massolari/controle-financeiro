import Vue from 'vue'
import Vuex from 'vuex'

import contas from './contas'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    contas
  }
})

export default store
