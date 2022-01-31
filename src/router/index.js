import Vue from 'vue'
import VueRouter from 'vue-router'
import usuario from '../store/modules/User'
import carrito from '../store/modules/Cart'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login/Login.vue'),
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register/Register.vue'),
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
    component: () => import('../views/Order/Order.vue'),
    meta: {isOrder: true}
  },
  {
    path: '/admin-foods',
    name: 'AdminFoods',
    component: () => import('../views/TableFood/TableFood.vue'),
    meta: {esProtegida: true}
  }, 
  {
    path: '/admin-orders',
    name: 'AdminOrders',
    component: () => import('../views/TableOrder/TableOrder.vue'),
    meta: {esProtegida: true}
  },
  {
    path: '/admin-users',
    name: 'AdminUsers',
    component: () => import('../views/TableUser/TableUser.vue'),
    meta: {esProtegida: true}
  },
  {
    path: '/:id/pedidos',
    name: 'OrdersUser',
    component: () => import('../views/OrderUser/OrderUser.vue'),
    meta: {esProtegida: true}
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const protegida = to.matched.some(item => item.meta.esProtegida)

  const isOrder = to.matched.some(item => item.meta.isOrder)

  if(protegida && usuario.state.token === null) {
    next({name: 'Login'})
  } else {
    next()
  }

  if(isOrder && carrito.state.carrito.length === 0) {
    next({name: 'Main'})
  } else {
    next()
  }
})
export default router
