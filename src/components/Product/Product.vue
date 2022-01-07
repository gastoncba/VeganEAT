<template>
    <v-container>
    <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="product.img"
      height="200px"
      width="100%"
    ></v-img>

    <v-card-title>
      {{product.name}}
    </v-card-title>

    <v-card-text>
      <v-row
        align="center"
        class="mx-0"
      >
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ms-4">
          4.5 (413)
        </div>

      </v-row>

      <div class="mt-4 text-subtitle-1">
        $ • {{product.price}} ARS
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="#4E9F3D" dark @click="verInfo()">
        Ver Información
      </v-btn>
    </v-card-actions>
  </v-card>

  <ProductDetail :dialog="detail" @volver='cerrar()' :product="product" :stock="getStock(product)"/>
  </v-container>
</template>

<script>
    import {mapGetters} from 'vuex'
    import ProductDetail from '../ProductDetail/ProductDetail.vue'
    export default {

        data() {
          return {
            detail: false
          }
        },

        props:{
            product: {
              type: Object,
              default: () => {} 
            },
        },
        methods: { 
          verInfo() {
            this.detail = true; 
          },
          cerrar() {
            this.detail = false
          }, 

          getStock(prod) {
            const prodInCart =  this.carrito.find(item => item._id === prod._id);
            return prodInCart ? (prod.stock - prodInCart.cant) : prod.stock;
          }
        },


        computed: {
          ...mapGetters(['carrito'])
        },

        components: {
          ProductDetail,
        },
    }
</script>

<style scoped>

</style>