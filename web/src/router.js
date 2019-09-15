import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import Home from './views/Home.vue'
import Main from './views/Main.vue'

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      component: Main,
      children: [
        {path: '/home', component: Home}
      ]
    },
  ]
})
