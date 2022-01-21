<template>
    <v-container class="mt-12">
        <v-row>
            <v-col order="2" lg="6" md="6" cols="12" sm="6">
                <StepOrder :totalPagar="calcularTotal()"/>
            </v-col>

            <v-col order="1" lg="6" md="6" cols="12" sm="6">
                <v-card>
                    <v-card-text>
                    <div class="text-center row--title">
                        Pedido 
                    </div>
                    <div class="row mt-2">
                        <p><b>Total por productos:</b></p>
                        <p>${{total|truncar}}</p>
                    </div>
                    <v-divider></v-divider>
                    <div class="row mt-2">
                        <p><b>Envio:</b></p>
                        <p>${{envio}}</p>
                    </div>
                    <v-divider></v-divider>
                    <div class="row row--total mt-2">
                        <p><b>Total:</b></p>
                        <p>${{calcularTotal()|truncar}}</p>
                    </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex'
    import StepOrder from '../../components/StepOrder/StepOrder.vue'
    export default {
        data() {
            return {
                envio: 50
            }
        },
        methods: {
            calcularTotal() {
                return this.total + this.envio
            }
        },
        computed: {
            ...mapGetters('carrito', ['total']),
        },
        components: {
            StepOrder,
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
    @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
    .row{
        display: flex;
        justify-content: space-between;
    }
    .row--title {
        font-family: 'Architects Daughter', cursive;
        font-size: 1.5rem;
        color: black;
    }
    .row--total {
        font-family: 'Fredoka One', cursive;
        font-size: 1rem;
    }
    
</style>