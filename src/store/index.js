import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import interfaceStore from './moules/interface/index'

import mutations from './mutations'
Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions,
  modules: {
    interface: interfaceStore
  }
})

export default store