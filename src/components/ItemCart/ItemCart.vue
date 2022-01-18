<template>
    <div>
        <div class="title-item">
            {{item.name}}
        </div>
        <div class="row mt-2">
            <p><b>Precio:</b></p>
            <p>${{item.price}}</p>
        </div>
        <v-divider></v-divider>
        <div class="row mt-2">
            <p><b>Cantidad:</b></p>
            <p>X{{item.cant}}</p>
        </div>
        <v-divider></v-divider>
        <div class="row mt-2">
            <p><b>Subtotal:</b></p>
            <p>${{item.price*item.cant|truncar}}</p>
        </div>
        <v-divider></v-divider>
        <div class="mt-2 mb-3">
            <v-btn icon @click="eliminarDelCarrito(item)"><v-icon>mdi-delete</v-icon></v-btn>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {
        props: {
            item: {
                type: Object,
                default: () => {}
            },
        },

        methods: {
            ...mapActions('carrito', ['setCart']),

            eliminarDelCarrito(item) {
                const nuevocarrito = this.carrito.filter(prod => prod.name != item.name)
                this.setCart(nuevocarrito)
            },

        },

        computed: {
            ...mapGetters('carrito', ['carrito'])
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

    .title-item{
        text-align: center;
        font-family: 'Fredoka One', cursive;
    }
    .row {
        display: flex;
        justify-content: space-between;
    }

</style>