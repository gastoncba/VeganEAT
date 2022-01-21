<template>
    <div>
        <v-virtual-scroll :items="carrito" item-height="170" max-height="350" min-height="200">
            <template v-slot:default="{ item }">
                <v-container fluid>
                <ItemCart :item="item"/>
                </v-container>
             </template>
        </v-virtual-scroll>
    <div class="total">
            <p>TOTAL: ${{total|truncar}}</p>
    </div>
    <div class="text-center">
        <router-link to="/order" style="text-decoration: none; color: white;">
            <v-btn dark color="red">
                <v-icon>mdi-truck-fast</v-icon>
                <p class="my-2">terminar pedido</p>
            </v-btn>
        </router-link>
    </div>
    </div>
</template>

<script>
    import ItemCart from '../ItemCart/ItemCart.vue'
    import {mapGetters} from 'vuex'
    export default {
        
        computed: {
            ...mapGetters('carrito', ['carrito', 'total']),
        },

        components: {
            ItemCart,
        },

        filters: {
            truncar(value) {
                return Math.floor(value*10)/10
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&family=Fredoka+One&display=swap');

    .total{
        text-align: center;
        font-family: 'Fredoka One', cursive;
        color: red;
    }
    
</style>