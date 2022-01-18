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
    >
      <div class="container-alert" v-if="!getStock(product)">
        <div class="container-alert--triangle">
          <div class="container-alert--text">
            <p>Sin Stock</p>
          </div>
        </div>
      </div>
    </v-img>

    <v-card-title>
      {{product.name}}
    </v-card-title>

    <v-card-text style="position: relative;">
      <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              color="#4E9F3D"
              class="white--text"
              fab
              small
              right
              absolute
              :disabled="!getStock(product)"
              @click="agregarAlCarrito(product)"
            >
            <v-icon>mdi-cart</v-icon>
            </v-btn>
          </template>
        <span>Agregar!</span>
      </v-tooltip>
      
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

      <ItemCount :stock="getStock(product)" @aumentar="tomarCantidad($event)" @disminuir="tomarCantidad($event)"/>

    </v-card-text>
    <v-card-actions>
      <v-btn color="#4E9F3D" dark @click="verInfo()" rounded>
        Detalle
      </v-btn>
    </v-card-actions>
  </v-card>

  <ProductDetail :dialog="detail" @volver='cerrar()' :product="product" :stock="getStock(product)"/>
  </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import ProductDetail from '../ProductDetail/ProductDetail.vue'
    import ItemCount from '../ItemCount/ItemCount.vue'
    export default {

        data() {
          return {
            detail: false,
            cant: 1
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
          }, 

          tomarCantidad(value) {
            this.cant = value
          },
          agregarAlCarrito(prod) {

            if(!this.prodInCart(prod)) {
              this.agregar([...this.carrito, {...prod, cant: this.cant}])
            } else {
              const nuevoCarrito = this.carrito.map(item => {
                if(item._id === prod._id) {
                  return {...item, cant: item.cant + this.cant}
                } else {
                    return item
                }
              })
                this.agregar(nuevoCarrito)
            }
          },

          prodInCart(prodSelect) {
                return this.carrito.some(item => item._id === prodSelect._id)
          },

          ...mapActions(['agregar'])
        },


        computed: {
          ...mapGetters(['carrito'])
        },

        components: {
          ProductDetail, ItemCount
        },
    }
</script>

<style scoped>
  .container-alert {
    position: relative;
  }

  .container-alert--triangle{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 0;
    height: 0;
    border-top: 100px solid purple;
    border-right: 100px solid transparent;
  }

  .container-alert--text{
    color: white;
    position: absolute;
    top: -100px;
    left: 15px;
    font-weight: bold;
    padding:5px;
    transform: rotate(-45deg);
    font-size: 12px;
  }
</style>