import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import http from './http'
import './style.css'

Vue.config.productionTip = false

// vue 原型上添加 http 模块
Vue.prototype.$http = http


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
