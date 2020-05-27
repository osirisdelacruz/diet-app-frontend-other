import Vue from 'vue'
import Vuex from 'vuex'

import Global from './modules/Global.js'
import APIAxios from './modules/APIAxios.js'
import Table from './modules/Table.js'

// Load Vuex
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    Table,
    Global,
    APIAxios
  }
})
