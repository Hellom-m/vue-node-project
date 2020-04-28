import Vue from 'vue'
import App from './App.vue'
import './assets/sass/style.scss'
import './assets/iconfont/iconfont.css'
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

import Card from "./components/Card.vue";
Vue.component('m-card', Card);

import ListCard from "./components/ListCard.vue";
Vue.component('list-card', ListCard);

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
