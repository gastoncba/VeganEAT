<template>
    <v-app>
      <Navbar/>
      <router-view />
    </v-app>
</template>

<script>
  import Navbar from './components/Navbar/Navbar.vue'
  import axios from 'axios'
  import {mapActions} from 'vuex'
  export default {
    components: {
      Navbar,
    },

    methods: {
      ...mapActions(['setProducts', 'setToken', 'setUser']), 
      leerToken() {
        if(localStorage.getItem('token')) this.setToken(localStorage.getItem('token'))
      }, 

      leerUsuario() {
        if(localStorage.getItem('user')) {
          const usuarioString = localStorage.getItem('user')
          const usuario = JSON.parse(usuarioString)
          this.setUser(usuario)
        }
      }
    },

    mounted () {
      axios.get('https://api-vegan-eat.herokuapp.com/api/products')
      .then((response) =>  this.setProducts(response.data))
      .catch((error) => console.log(`error: ${error}`))

      this.leerToken()
      this.leerUsuario()
    },
  }
</script>

<style lang="scss">

</style>
