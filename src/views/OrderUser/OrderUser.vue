<template>
    <v-container class="mt-12">
        <v-progress-linear v-if="loading" indeterminate color="success">

        </v-progress-linear>
        <v-data-table v-else :headers="cabeceras" :items="orders">
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
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                loading: true,
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
            }
        },

        mounted () {
            this.getOrdersUser()
        },
    }
</script>

<style scoped>

</style>