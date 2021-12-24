<template>
    
    <div v-if="!estaVacio()" class="mt-6">
            <h3 class="cart-title">Su carrito</h3>
            <v-data-table :items="carrito" :headers="headers" hide-default-footer>
                <template v-slot:item.delete="{ item }">
                    <td>
                        <v-btn icon @click="eliminar(item)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </td>
                </template>    
                <template v-slot:item.subTotal="{item}">
                    {{item.cant*item.price|truncar}}
                </template>
            </v-data-table>
            <h4 class="total-title">Total: ${{calcularTotal|truncar}}</h4>
        </div>
        <div v-else style="text-align:center;">
            <h3>Carrito vacio!</h3>
            <v-icon color="black" size=40>mdi-emoticon-sad</v-icon>
            <v-spacer></v-spacer>
            <v-btn color="#4E9F3D" dark class="mt-2" @click="volver()"><v-icon dark left>mdi-arrow-left</v-icon>Volver</v-btn>
        </div>
</template>

<script>
    import headers from '../../assets/data/headers.json'
    import carrito from '../../assets/data/carrito.json'
    export default {
        data() {
            return {
                headers: headers,
                carrito: carrito,
            }
        },
        methods: {
            estaVacio() {
                return this.carrito.length == 0
            },

            eliminar(item) {
                this.carrito = this.carrito.filter(prod => prod.name != item.name)
            },
            volver() {
                this.$router.push('/')
            }
        }, 
        computed: {
            calcularTotal () {
                const total = this.carrito.reduce((sumaTotal, prod) => {
                    return (prod.cant*prod.price) + sumaTotal
                    }, 0)

                return total
            }
        },

        filters: {
            truncar(value) {
                return Math.floor(value*10)/10
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