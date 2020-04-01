import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/Main.vue'
import CategoriesEdit from '../views/CategoriesEdit'
import CategoriesList from '../views/CategoriesList'

Vue.use(VueRouter)

const routes = [
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

export default router
