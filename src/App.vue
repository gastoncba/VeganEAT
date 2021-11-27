<template>
  <v-app>
    <Navbar/>
    <ContainerMain />
    <ProductList />
    <Footer />
  </v-app>
</template>

<script>
import ContainerMain from './components/ContainerMain/ContainerMain.vue';
import Footer from './components/Footer/Footer.vue';
import Navbar from './components/Navbar/Navbar.vue';
import ProductList from './components/ProductList/ProductList.vue';

export default {
  name: 'App',
  components: { Navbar, ProductList, ContainerMain, Footer},

  data: () => ({
  }),
};
</script>
