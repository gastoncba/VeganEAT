<template>
    <v-container class="mt-12">
        <h1 class="text-center">Ordenes</h1>
        <v-progress-linear v-if="loading" indeterminate color="success">

        </v-progress-linear>

        <v-data-table v-else :headers="cabeceras" :items="orders">
            <template v-slot:item.entregado="{item}">
                <td>
                    <v-chip v-if="item.entregado" color="green" dark @click="abrirDialog(item)">
                        entregada
                        <v-icon class="ml-1">mdi-check</v-icon>
                    </v-chip>
                    <v-chip v-else color="red" dark @click="abrirDialog(item)">
                        pendiente
                        <v-icon class="ml-1">mdi-close-circle</v-icon>
                    </v-chip>
                </td>
            </template>
            
            <template v-slot:item.delete="{item}">
                <td>
                    <v-icon
                    small
                    @click="deleteMod(item)"
                    >
                    mdi-delete
                    </v-icon>
                </td>
                
            </template>
        </v-data-table>

        <p v-show="stateCartel">{{cartel}}</p>


        <v-dialog v-model="dialogState" persistent max-width="290">
            <v-card>
                <v-card-title>
                    {{action}}
                </v-card-title>

                <v-card-text>
                    Seguro que desea {{text}}?
                </v-card-text>
            <v-spacer></v-spacer>

            <v-card-actions>
                <v-btn color="green darken-1" dark @click="ejecutar()">
                    aceptar
                </v-btn>

                <v-btn color="green darken-1" text @click="dialogState = false">
                    cancelar
                </v-btn>
            </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {

        data() {
            return {
                cartel: '',
                text: '',
                action: '',
                orderState: false,
                orderID: '',
                dialogState: false,
                loading: true,
                stateCartel: true,
                orders: [],
                cabeceras: [
                    {
                        text: 'Cuidad',
                        value: 'address1.cuidad',
                        sortable: false
                    }, 
                    {
                        text: 'Calle',
                        value: 'address1.calle',
                        sortable: false
                    },
                    {
                        text: 'Número de calle',
                        value: 'address1.nroCalle',
                        sortable: false
                    },
                    {
                        text: 'Telefono',
                        value: 'telefono',
                        sortable: false
                    }, 
                    {
                        text: 'Estado',
                        value:  'entregado',
                        sortable:  false
                    },
                    {
                        text: 'Eliminar',
                        value:  'delete',
                        sortable:  false
                    },
                ]
            }
        },

        methods: {
            getOrders() {
                axios.get('https://api-vegan-eat.herokuapp.com/api/orders')
                .then((response) => {
                    this.orders = response.data
                    this.loading = false
                })
                .catch((e) => {
                    console.log(e)
                })
            }, 
            abrirDialog(order) {

                this.dialogState = true
                this.orderState = order.entregado
                this.orderID = order._id
                this.action = 'Modificar'
                if(this.orderState) {
                    this.text = 'poner a la orden como pendiente'
                } else {
                    this.text = 'poner a la orden como entregada'
                }
            },

            deleteMod(order) {
                this.dialogState = true
                this.action = 'Eliminar'
                this.text = 'eliminar la orden'
                this.orderID = order._id
            },

            ejecutar() {
                if(this.action === 'Modificar') {
                    this.pasarDeEstado(this.orderState)
                } else {
                    this.eliminar()
                }
            },

            pasarDeEstado(state) {
                const newState = { }
                if(state) {
                    newState.state = false
                } else {
                    newState.state = true
                }

                axios.patch(`https://api-vegan-eat.herokuapp.com/api/orders/update-state/${this.orderID}`, newState)
                .then((response)=>{
                    this.stateCartel = true
                    this.cartel = response.data
                })
                .catch((error)=>{
                    console.log(error.response.data.error)
                    this.stateCartel = true
                    this.cartel = 'a ocurrido un error...'
                })

                this.dialogState = false

                setTimeout(()=>{
                    this.stateCartel = false
                }, 5000)
            }, 

            eliminar() {
                axios.delete(`https://api-vegan-eat.herokuapp.com/api/orders/delete/${this.orderID}`)
                .then((response) => {
                    this.stateCartel = true
                    this.cartel = response.data
                })
                .catch((error) => {
                    console.log(error.response.data.error)
                    this.stateCartel = true
                    this.cartel = 'error al intentar borrar..'
                })

                this.dialogState = false

                setTimeout(()=>{
                    this.stateCartel = false
                }, 5000)
            }
        },

        mounted () {
            this.getOrders()
        },

        updated () {
            this.getOrders();
        },
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&family=Fredoka+One&display=swap');
    
    h1 {
        font-family: 'Fredoka One', cursive;
        font-size: 2em;
    }

</style>