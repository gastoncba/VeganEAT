<template>
    <div>
    <div v-for="(item) in carrito" :key="item._id">
        <ItemCart :item="item"/>
    </div>
    <div class="total">
            <p>TOTAL: $100</p>
    </div>
    <div>
        <v-btn dark color="red">
            <v-icon>mdi-truck-fast</v-icon>
            <p class="ml-1 my-2">terminar pedido</p>
        </v-btn>
    </div>
    </div>
</template>

<script>
    import ItemCart from '../ItemCart/ItemCart.vue'
    import {mapGetters} from 'vuex'
    export default {
        
        computed: {
            ...mapGetters(['carrito'])
        },

        components: {
            ItemCart,
        },
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