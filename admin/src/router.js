import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Main from './views/Main.vue'
import CategoriesEdit from './views/CategoriesEdit.vue'
import CategoriesList from './views/CategoriesList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        {
          path: '/categories/create',
          name: 'categoriesCreate',
          component: CategoriesEdit
        },
        {
          path: '/categories/edit/:id',
          name: 'categoriesEdit',
          component: CategoriesEdit,
          props: true
        },
        {
          path: '/categories/list',
          name: 'CategoriesList',
          component: CategoriesList
        }
      ]
    },
  ]
})
