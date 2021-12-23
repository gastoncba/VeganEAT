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
      ...mapActions(['setProducts'])
    },

    mounted () {
      axios.get('https://api-vegan-eat.herokuapp.com/api/products')
      .then((response) =>  this.setProducts(response.data))
      .catch((error) => console.log(`error: ${error}`))
    },
  }
</script>

<style lang="scss">

</style>
