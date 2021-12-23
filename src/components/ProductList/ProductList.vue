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
    import {mapGetters} from 'vuex'
    export default {
        components: {
            Product,
        },
        methods: {
          hayProductos() {
              console.log(this.cant)
              return this.cant !== 0
          }
        },

        computed: {
            ...mapGetters(['products','cant'])
        },
    }
</script>

<style scoped>

</style>