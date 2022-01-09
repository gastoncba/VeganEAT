<template>
    <v-container>
        <v-row v-if="hayProductos()">
            <v-col v-for="(product) in products" :key="product._id" sm="6" md="4" lg="4" cols="12">
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
    import {mapGetters} from 'vuex'
    export default {
        components: {
            Product,
        },
        methods: {
          hayProductos() {
              return this.cantProducts !== 0
          }
        },

        computed: {
            ...mapGetters(['products','cantProducts'])
        },
    }
</script>

<style scoped>

</style>