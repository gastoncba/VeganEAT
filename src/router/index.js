import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register/Register.vue')
  }, 

  {
    path: '/', 
    name: 'Main', 
    component: () => import('../views/Main/Main.vue')
  },
  {
    path: '/detail/:id',
    name: 'Detail', 
    component: () => import('../views/Detail/Detail.vue')
  },
  {
    path: '/carrito',
    name: 'Cart',
    component: () => import('../views/Cart/Cart.vue')
  }, 
  {
    path: '/profile-admin',
    name: 'Profile',
    component: () => import('../views/profileAdmin/Admin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
