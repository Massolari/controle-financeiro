import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import * as getters from './getters'
import * as actions from './actions'
import * as mutations from './mutations'

import gastos from './gastos'
import cartoes from './cartoes'
import util from './util'

Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  modules: {
    gastos,
    cartoes,
    util
  }
})

export default store
