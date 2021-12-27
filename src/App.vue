<template>
    <v-app>
      <Navbar/>
      <router-view />
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
      ...mapActions(['setProducts', 'setToken', 'setUser', 'cargarCarrito']), 

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
          this.cargarCarrito(cart)
        }
      },

      tomarProductos() {
        axios.get('https://api-vegan-eat.herokuapp.com/api/products')
        .then((response) =>  this.setProducts(response.data))
        .catch((error) => console.log(`error: ${error}`))
      }
    },

    computed: {
      ...mapGetters(['token','user', 'carrito'])
    },

    mounted () {
      this.tomarProductos()
      this.tomarCarrito()
      this.leerToken()
      this.leerUsuario()
    },

    watch: {
      carrito() {
        console.log(this.carrito)
        localStorage.setItem('cart', JSON.stringify(this.carrito))
      }
    },

  }
</script>

<style lang="scss">

</style>
