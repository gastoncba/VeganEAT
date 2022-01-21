<template>
    <v-container class="mt-12">
        <h1 class="text-center">Sus ordenes</h1>
        <v-progress-linear v-if="loading" indeterminate color="success">

        </v-progress-linear>
        <v-data-table v-else :headers="cabecerasOrden" :items="orders">

            <template v-slot:item.calle="{item}">
                <td>
                    {{item.address1.calle}} {{item.address1.nroCalle}}
                </td>
            </template>

            <template v-slot:item.monto="{item}">
                <td>
                    ${{item.monto|truncar}}
                </td>
            </template>

            <template v-slot:item.foods="{item}">
                <td>
                    <v-btn
                    dark
                    color="purple"
                    rounded
                    small
                    @click="verProductos(item)"
                    >
                    ver
                    </v-btn>
                </td>
            </template>

            <template v-slot:item.entregado="{item}">
                <td>
                    <v-chip v-if="item.entregado" color="green" dark>
                        entregada
                        <v-icon class="ml-1">mdi-check</v-icon>
                    </v-chip>
                    <v-chip v-else color="red" dark>
                        pendiente
                        <v-icon class="ml-1">mdi-close-circle</v-icon>
                    </v-chip>
                </td>
            </template>
        </v-data-table>

        <v-dialog v-model="productsDialog">
            <v-card>
                <h2 class="text-center prod-order-title">Comidas del Pedido</h2>
                <v-data-table :headers="cabecerasProductos" :items="products">

                </v-data-table>
            </v-card>
        </v-dialog>

    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                loading: true,
                productsDialog: false,
                products: [],
                orders: [],
                cabecerasOrden: [
                    {
                        text: 'Cuidad',
                        value: 'address1.cuidad',
                        sortable: false
                    }, 
                    {
                        text: 'Calle y Número',
                        value: 'calle',
                        sortable: false
                    },
                    {
                        text: 'Telefono',
                        value: 'telefono',
                        sortable: false
                    }, 
                    {
                        text: 'Monto',
                        value: 'monto',
                        sortable: false
                    },
                    {
                        text: 'Estado',
                        value:  'entregado',
                        sortable:  false
                    },
                    {
                        text: 'Comidas',
                        value: 'foods',
                        sortable: false
                    },
                ],
                cabecerasProductos: [
                    {
                        text:'Nombre',
                        value: 'name',
                        sortable: false,
                    },
                    {
                        text: 'Precio',
                        value: 'price',
                        sortable:false
                    },
                    {
                        text:'Cantidad', 
                        value: 'cant',
                        sortable: false
                    }
                ]
            }
        },

        methods: {
            getOrdersUser() {
                axios.get(`https://api-vegan-eat.herokuapp.com/api/users/${this.$route.params.id}/orders`)
                .then((response) => {
                    this.loading = false
                    this.orders = response.data 
                })
                .catch((error) => {
                    console.log(error)
                })
            }, 

            verProductos(order) {
                this.products = order.products
                this.productsDialog = true
            }
        },

        filters: {
            truncar(value) {
                return Math.floor(value*10)/10
            }
        },

        mounted () {
            this.getOrdersUser()
        },
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&family=Fredoka+One&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
    h1 {
        font-family: 'Fredoka One', cursive;
        font-size: 2em;
    }

    .prod-order-title {
        font-family: 'Architects Daughter', cursive;
        font-size: 150%; 
    }

</style>