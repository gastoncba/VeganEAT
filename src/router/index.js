import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register/Register.vue')
  }, 

  {
    path: '/main', 
    name: 'Main', 
    component: () => import('../views/Main/Main.vue')
  },
  {
    path: '/productDetail/:id',
    name: 'productDetail', 
    component: () => import('../views/Detail/Detail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
