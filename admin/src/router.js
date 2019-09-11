import Vue from 'vue'
import Router from 'vue-router'
// import Home from './views/Home.vue'
import Main from './views/Main.vue'
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'

import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'

import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'

import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'

import AdEdit from './views/AdEdit.vue'
import AdList from './views/AdList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        { path: '/categories/create', name: 'categoriesCreate', component: CategoryEdit },
        { path: '/categories/edit/:id', name: 'categoriesEdit', component: CategoryEdit, props: true },
        { path: '/categories/list', name: 'categoriesList', component: CategoryList },

        { path: '/items/create', name: 'itemsCreate', component: ItemEdit },
        { path: '/items/edit/:id', name: 'itemsEdit', component: ItemEdit, props: true },
        { path: '/items/list', name: 'itemsList', component: ItemList },

        { path: '/heroes/create', name: 'heroesCreate', component: HeroEdit },
        { path: '/heroes/edit/:id', name: 'heroesEdit', component: HeroEdit, props: true },
        { path: '/heroes/list', name: 'heroesList', component: HeroList },

        { path: '/articles/create', name: 'articlesCreate', component: ArticleEdit },
        { path: '/articles/edit/:id', name: 'articlesEdit', component: ArticleEdit, props: true },
        { path: '/articles/list', name: 'articlesList', component: ArticleList },

        { path: '/ads/create', name: 'adsCreate', component: AdEdit },
        { path: '/ads/edit/:id', name: 'adsEdit', component: AdEdit, props: true },
        { path: '/ads/list', name: 'adsList', component: AdList },
      ]
    },
  ]
})
