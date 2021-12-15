<template>
    <v-container>
        <v-row v-if="hayProductos()">
            <v-col v-for="(product) in products" :key="product._id">
                <Product 
                    :product="product"
                />
            </v-col>
        </v-row>
        <div class="text-center" v-else>
            <v-progress-circular color="green" indeterminate width="6">

            </v-progress-circular>
        </div>
    </v-container>
</template>

<script>
    import Product from '../Product/Product.vue'
    import axios from 'axios'
    export default {
        components: {
            Product,
        },
        methods: {

            getProducts() {
                axios.get('https://api-vegan-eat.herokuapp.com/api/products')
                .then((response) => this.products = response.data )
                .catch((error) => console.log(`error: ${error}`))
            },
            hayProductos() {
                return this.products.length != 0
            }
        },

        data() {
            return {
                products: [], 
            }
        },

        mounted () {
            this.getProducts()
        },
    }
</script>

<style scoped>

</style>