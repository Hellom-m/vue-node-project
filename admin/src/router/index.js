import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import Login from '../views/Login.vue'
import CategoriesEdit from '../views/CategoriesEdit'
import CategoriesList from '../views/CategoriesList'

import ItemEdit from '../views/ItemEdit'
import ItemList from '../views/ItemList'

import HeroesEdit from '../views/HeroesEdit'
import HeroesList from '../views/HeroesList'

import ArticleEdit from '../views/ArticleEdit'
import ArticleList from '../views/ArticleList'

import AdsEdit from '../views/AdsEdit'
import AdsList from '../views/AdsList'

import AdminUsersEdit from '../views/AdminUsersEdit'
import AdminUsersList from '../views/AdminUsersList'


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    name: 'Main',
    component: Main,
    children: [
      {
        path: '/categories/create',
        // name: 'CategoriesEdit',
        component: CategoriesEdit
      },
      {
        path: '/categories/edit/:id',
        component: CategoriesEdit,
        props: true
      },
      {
        path: '/categories/list',
        // name: 'CategoriesList',
        component: CategoriesList
      },
      {
        path: '/items/create',
        component: ItemEdit
      },
      {
        path: '/items/edit/:id',
        component: ItemEdit,
        props: true
      },
      {
        path: '/items/list',
        // name: 'CategoriesList',
        component: ItemList
      },
      {
        path: '/heroes/create',
        // name: 'CategoriesEdit',
        component: HeroesEdit
      },
      {
        path: '/heroes/edit/:id',
        component: HeroesEdit,
        props: true
      },
      {
        path: '/heroes/list',
        // name: 'CategoriesList',
        component: HeroesList
      },
      {
        path: '/articles/create',
        // name: 'CategoriesEdit',
        component: ArticleEdit
      },
      {
        path: '/articles/edit/:id',
        component: ArticleEdit,
        props: true
      },
      {
        path: '/articles/list',
        // name: 'CategoriesList',
        component: ArticleList
      },
      {
        path: '/ads/create',
        // name: 'CategoriesEdit',
        component: AdsEdit
      },
      {
        path: '/ads/edit/:id',
        component: AdsEdit,
        props: true
      },
      {
        path: '/ads/list',
        // name: 'CategoriesList',
        component: AdsList
      },
      {
        path: '/admin_users/create',
        // name: 'CategoriesEdit',
        component: AdminUsersEdit
      },
      {
        path: '/admin_users/edit/:id',
        component: AdminUsersEdit,
        props: true
      },
      {
        path: '/admin_users/list',
        // name: 'CategoriesList',
        component: AdminUsersList
      }
    ]
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

// 客户端验证
router.beforeEach((to, from, next) => {
  // 是否公开访问页面 并且 token不存在 
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next()
})

export default router
