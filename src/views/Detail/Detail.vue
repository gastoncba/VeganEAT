<template>
    <div v-if="loading" class="text-center">
      <v-progress-circular color="green" indeterminate width="6">

      </v-progress-circular>
    </div>
    
    <v-card
      v-else
      class="mx-auto my-12"
      color="grey lighten-4"
      max-width="600"
    >
      <v-img
        :aspect-ratio="16/9"
        :src="product.img"
      >
      </v-img>
      <v-card-text
        class="pt-6"
        style="position: relative;"
      >
        <v-btn v-if="product.stock"
          absolute
          color="#4E9F3D"
          class="white--text"
          fab
          large
          right
          top
          @click="agregar()"
        >
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <v-chip v-else color="red" dark class="mb-2">sin stock</v-chip>
        <h3 class="text-h4 mb-2 name-title" style="color: #4E9F3D">
          {{product.name}}
        </h3>
        <div class="font-weight-light text-h6 mb-2">
          {{product.desc}}
        </div>
        <h2 class="font-weight-light text-h6 mb-2">
          <b>Precio:</b> ${{product.price}}
        </h2>
        <h2 class="font-weight-light text-h6 mb-2" v-if="product.stock">
            <b>Cantidad para llevar: </b>{{cant}}
        </h2>
        <div v-if="product.stock">
            <v-btn icon color="#4E9F3D" @click="aumentar()"><v-icon size=40>{{iconAdd}}</v-icon></v-btn>
            <v-btn icon color="#4E9F3D" @click="disminuir()" class="ml-2"><v-icon size=40>{{iconRemove}}</v-icon></v-btn>
        </div>
      </v-card-text>
    </v-card>
</template>

<script>
    import axios from 'axios'
    import { mdiPlusCircle } from '@mdi/js';
    import { mdiMinusCircle } from '@mdi/js';
    export default {
        data() {
            return {
                loading: true,
                product: {},
                iconAdd: mdiPlusCircle,
                iconRemove: mdiMinusCircle,
                cant: 1, 
                productAdd: {}
            }
        },
        methods: {
            getProduct() {
                axios.get(`https://api-vegan-eat.herokuapp.com/api/products/${this.$route.params.id}`)
                .then((response) => {
                    this.product = response.data
                    this.loading = false
                    })
                .catch((error) => console.log(`error: ${error}`))
            }, 
            aumentar() {
             if(this.cant < this.product.stock) {
               this.cant += 1
             } 
           },
           disminuir() {
             if(this.cant != 1) {
               this.cant -= 1
             }
           }
        },
        mounted () {
            this.getProduct()
        },
    }
</script>

<style scoped>
    .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: .5;
    position: absolute;
    width: 100%;
    }
    
</style>