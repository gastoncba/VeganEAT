<template>
    <v-container>
        <v-row>
            <v-col v-for="(product,i) in products" :key="i">
                <Product 
                    :product="product"
                    @agregarAlCarrito="agregar($event)"
                />
            </v-col>
        </v-row>
        <div v-if="!estaVacio()" class="mt-6">
            <h3 class="cart-title">Su carrito</h3>
            <v-data-table :items="carrito" :headers="headers" hide-default-footer>
                <template v-slot:item.delete="{ item }">
                    <td>
                        <v-btn icon @click="eliminar(item)">
                            <v-icon>{{deleteIcon}}</v-icon>
                        </v-btn>
                    </td>
                </template>    
                <template v-slot:item.subTotal="{item}">
                    {{item.subTotal|truncar}}
                </template>
            </v-data-table>
            <h4 class="total-title">Total: ${{calcularTotal|truncar}}</h4>
        </div>
    </v-container>
</template>

<script>
    import Product from '../Product/Product.vue'
    import products from '../../assets/data/products.json'
    import headers from '../../assets/data/headers.json'
    import { mdiDelete } from '@mdi/js';
    export default {
        components: {
            Product,
        },
        methods: {
            agregar(prod) {

                const prodInCart =  this.carrito.find(item => item.name == prod.prod.name)
                
                if(prodInCart) {
                    prodInCart.cant += prod.cant
                    prodInCart.subTotal = Math.floor((prodInCart.cant*prodInCart.price)*10)/10
                } else {
                    const nuevoProducto = {
                        name: prod.prod.name,
                        desc: prod.prod.desc,
                        price: prod.prod.price,
                        cant: prod.cant,
                        subTotal: prod.cant*prod.prod.price
                }
                this.carrito.push(nuevoProducto)
                }
            }, 

            estaVacio() {
                return this.carrito.length == 0
            },

            eliminar(item) {
                this.carrito = this.carrito.filter(prod => prod.name != item.name)
                
                this.products.forEach(p => {
                    if(p.name == item.name) {
                        p.stock += item.cant
                        return 
                    }
                });

            },
        },

        computed: {
            calcularTotal () {
                const total = this.carrito.reduce((sumaTotal, prod) => {
                    return prod.subTotal + sumaTotal
                    }, 0)

                return total
            }
        },

        filters: {
            truncar(value) {
                return Math.floor(value*10)/10
            }
        },

        data() {
            return {
                headers: headers,
                products: products,
                carrito: [
                ],
                deleteIcon: mdiDelete 
            }
        },
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&family=Fredoka+One&display=swap');
    .cart-title{
        text-align: center;
        font-family: 'Fredoka One', cursive;
    }

    .total-title {
        text-align: center;
        color: #DD4A48;
    }
</style>