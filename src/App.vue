<template>
    <v-app>
      <Navbar/>
      <router-view />
    </v-app>
</template>

<script>
  import Navbar from './components/Navbar/Navbar.vue'
  export default {
    components: {
      Navbar,
    },
  }
</script>

<style lang="scss">

</style>
