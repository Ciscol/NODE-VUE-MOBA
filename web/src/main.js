import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './style.scss'
Vue.config.productionTip = false;

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
