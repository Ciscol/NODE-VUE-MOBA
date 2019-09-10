import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'

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
          component: CategoryEdit
        },
        {
          path: '/categories/edit/:id',
          name: 'categoriesEdit',
          component: CategoryEdit,
          props: true
        },
        {
          path: '/categories/list',
          name: 'categoriesList',
          component: CategoryList
        },

        {
          path: '/items/create',
          name: 'itemsCreate',
          component: ItemEdit
        },
        {
          path: '/items/edit/:id',
          name: 'itemsEdit',
          component: ItemEdit,
          props: true
        },
        {
          path: '/items/list',
          name: 'itemsList',
          component: ItemList
        }
      ]
    },
  ]
})
