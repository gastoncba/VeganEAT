<template>
    <div>
        <v-radio-group v-model="tipoDePago">
            <v-radio v-for="(pago,i) in pagos" :key="i" :label="pago" :value="pago" @click="agregarTarjeta()" color="deep-purple accent-4"></v-radio>
        </v-radio-group>

        <v-btn @click="volver()" color="deep-purple" text rounded>
            volver
        </v-btn>

        <v-btn @click="continuar()" color="deep-purple" dark rounded class="ml-4"> 
            continuar
        </v-btn>

        <PayCard :payCardState="ventanaTarjeta" @cerrar="cerrarVentanaTarjeta($event)"/>

    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import PayCard from '../PayCard/PayCard.vue'
    export default {
        data() {
            return {
                pagos: ['Efectivo', 'Tarjeta'],
                tipoDePago: 'Efectivo', 
                ventanaTarjeta: false,
            }
        },

        methods: {
            agregarTarjeta() {
                if(this.esPagoConTarjeta()) {
                    this.ventanaTarjeta = true
                }
            }, 

            esPagoConTarjeta() {
                return this.tipoDePago === 'Tarjeta'
            },

            cerrarVentanaTarjeta(validation) {
                if(validation) {
                    this.tipoDePago = 'Tarjeta'
                } else {
                    this.tipoDePago = 'Efectivo'
                }
                this.ventanaTarjeta = false
            },

            continuar() {
                this.setOrder({...this.order, formaDePago: this.tipoDePago})
                this.$emit('siguiente',3)
            }, 

            volver() {
                this.$emit('volver', 1)
            }, 

            ...mapActions(['setOrder'])
        },

        computed: {
            ...mapGetters(['order'])
        },

        components: {
            PayCard,
        },
    }
</script>

<style lang="scss" scoped>

</style>