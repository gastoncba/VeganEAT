import Vue from 'vue'
import VueRouter from 'vue-router'
import usuario from '../store/modules/User'

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
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile/Profile.vue'),
    meta: {esProtegida: true}
  },
  {
    path: '/order',
    name: 'Order', 
    component: () => import('../views/Order/Order.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const protegida = to.matched.some(item => item.meta.esProtegida)

  if(protegida && usuario.state.token === null) {
    next({name: 'Login'})
  } else {
    next()
  }
})

export default router
