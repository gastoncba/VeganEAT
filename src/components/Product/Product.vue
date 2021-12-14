<template>
    <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="product.img"
      height="200px"
    ></v-img>

    <v-card-title>
      {{product.name}}
    </v-card-title>

    <v-card-actions>
      <v-btn color="#4E9F3D" dark @click="verInfo()">
        Ver Información
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
// import { mdiPlusCircle } from '@mdi/js';
// import { mdiMinusCircle } from '@mdi/js';
    export default {
        props:{
            product: {
              type: Object,
              default: () => {} 
            },
        },
        methods: { 
          verInfo() {
            this.$router.push(`/productDetail/:${this.product.id}`)
            //console.log(this.product.id)
          }
        }
        //   agregar() {
        //     this.productAdd = {
        //       prod: this.product,
        //       cant: this.cant,
        //     }
        //     //update product stock
        //     this.product.stock -= this.cant
        //     this.cant = 1 
        //     this.$emit('agregarAlCarrito',this.productAdd)
        //   }, 
        //   aumentar() {
        //     if(this.cant < this.product.stock) {
        //       this.cant += 1
        //     } 
        //   },
        //   disminuir() {
        //     if(this.cant != 1) {
        //       this.cant -= 1
        //     }
        //   }
        // },
        // data() {
        //     return {
        //         // iconAdd: mdiPlusCircle,
        //         // iconRemove: mdiMinusCircle,
        //         // show:false,
        //         // cant: 1, 
        //         // productAdd: {}
        //     }
        // },
    }
</script>

<style scoped>

</style>