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
      <v-btn
        color="#4E9F3D"
        text
      >
        Ver Información
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{product.desc}}
          <p><b>Precio:</b> ${{product.price}}</p>
          <div v-if="product.stock">
          <v-btn color="#4E9F3D" dark @click="agregar()">Agregar</v-btn>
          <v-btn icon @click="aumentar()"><v-icon>{{iconAdd}}</v-icon></v-btn>
          <v-btn icon @click="disminuir()"><v-icon>{{iconRemove}}</v-icon></v-btn>
          {{cant}}
          </div>
          <v-chip v-else color="red" dark>Sin Stock</v-chip>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
import { mdiPlusCircle } from '@mdi/js';
import { mdiMinusCircle } from '@mdi/js';
    export default {
        props:{
            product: {
              type: Object,
              default: () => {} 
            },
        },
        methods: {
          agregar() {
            this.productAdd = {
              prod: this.product,
              cant: this.cant,
            }
            //update product stock
            this.product.stock -= this.cant
            this.cant = 1 
            this.$emit('agregarAlCarrito',this.productAdd)
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
        data() {
            return {
                iconAdd: mdiPlusCircle,
                iconRemove: mdiMinusCircle,
                show:false,
                cant: 1, 
                productAdd: {}
            }
        },
        watch: {
          product() {
            console.log(this.product)
          }
        },
    }
</script>

<style scoped>

</style>