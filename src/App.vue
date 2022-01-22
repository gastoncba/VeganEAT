<template>
    <v-app>
      <Navbar/>
      <v-main>
        <router-view />
      </v-main>
    </v-app>
</template>

<script>
  import Navbar from './components/Navbar/Navbar.vue'
  import axios from 'axios'
  import {mapActions, mapGetters} from 'vuex'
  export default {
    components: {
      Navbar,
    },

    methods: {
      ...mapActions(['setProducts']),
      ...mapActions('carrito', ['setCart', 'setStateCart']),
      ...mapActions('usuario', ['setUser', 'setToken']),

      leerToken() {
        if(localStorage.getItem('token')) this.setToken(localStorage.getItem('token'))
      }, 

      leerUsuario() {
        if(localStorage.getItem('user')) {
          const usuarioString = localStorage.getItem('user')
          const usuario = JSON.parse(usuarioString)
          this.setUser(usuario)
        }
      },
      
      tomarCarrito() {
        if(localStorage.getItem('cart')) {
          const cartString = localStorage.getItem('cart') 
          const cart = JSON.parse(cartString)
          this.setCart(cart)
        }
      },

      tomarProductos() {
        axios.get('https://api-vegan-eat.herokuapp.com/api/products')
        .then((response) =>  this.setProducts(response.data))
        .catch((error) => console.log(`error: ${error}`))
      }
    },

    computed: {
      ...mapGetters('carrito', ['carrito'])
    },

    mounted () {
      this.tomarProductos()
      this.tomarCarrito()
      this.leerToken()
      this.leerUsuario()
      console.log('montado app..')
    },

    watch: {
      carrito() {
        localStorage.setItem('cart', JSON.stringify(this.carrito))
      },
      $route() {
        if(this.$route.path === '/order') {
          this.setStateCart(false)
        } else {
          this.setStateCart(true)
        }
      }
    },
  }
</script>

<style lang="scss">

</style>
