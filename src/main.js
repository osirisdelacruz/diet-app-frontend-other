import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import './registerServiceWorker'

import VueSession from 'vue-session'
Vue.use(VueSession, { persist: true })

import CGAlert from '@/modules/CGAlert'
import ModalAlert from '@/modules/ModalAlert'
import ModalLoading from '@/modules/ModalLoading'
import ModalConfirm from '@/modules/ModalConfirm'
//import Table from '@/modules/Table'
import { MixinsFormHelper } from '@/mixins/index'

Vue.component('CGAlert', CGAlert)
Vue.component('ModalAlert', ModalAlert)
Vue.component('ModalLoading', ModalLoading) 
Vue.component('ModalConfirm', ModalConfirm) 
//Vue.component('Table', Table)

Vue.mixin({
  mixins: [MixinsFormHelper]
})

import HelperPlugin from '@/helper/helper.js'
Vue.use(HelperPlugin)

import AuthUserHelperPlugin from '@/helper/authUserHelper.js'
Vue.use(AuthUserHelperPlugin)

Vue.config.productionTip = false


//Import Axios
import axios from 'axios'
let session = Vue.prototype.$session
if(session.exists()){
  axios.defaults.headers.common['Authorization'] = 'Bearer '+  session.get('jwt')
}

// Importing the global css file
import "@/assets/css/global.css"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

