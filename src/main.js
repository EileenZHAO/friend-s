// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router'
import App from './App'
import local from './libs/usersMessage'
import base64 from './libs/base64'
import judge from './libs/judge'
import {ConfirmPlugin, AlertPlugin} from 'vux'
import '@/assets/css/app.css'

FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.use(ConfirmPlugin)
Vue.use(AlertPlugin)
Vue.use(local)
Vue.use(base64)
Vue.use(judge)

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
