<template>
  <v-app>
    <Login />
    <Navbar/>
    <ContainerMain />
    <ProductList />
    <Footer />
    
  </v-app>
</template>

<script>
import Login from './components/Login/Login.vue'
import ContainerMain from './components/ContainerMain/ContainerMain.vue';
import Footer from './components/Footer/Footer.vue';
import Navbar from './components/Navbar/Navbar.vue';
import ProductList from './components/ProductList/ProductList.vue';

export default {
  name: 'App',
  components: { Navbar, ProductList, ContainerMain, Footer, Login},

  data: () => ({
  }),
};
</script>
