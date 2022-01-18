<template>
    <div>
        <v-stepper vertical v-model="step" style="position:relative;">
            <v-stepper-step step="1" :complete="step > 1" color="deep-purple">
                Dirección de entrega
            </v-stepper-step>
                    
            <v-stepper-content step="1">
                <Address @siguiente="siguiente($event)"/> 
            </v-stepper-content>

            <v-stepper-step step="2" :complete="step > 2" color="deep-purple">
                Forma de pago
            </v-stepper-step>

            <v-stepper-content step="2">
                <PayOptions @siguiente="siguiente($event)" @volver="volver($event)"/>
            </v-stepper-content>
   
            <v-stepper-step step="3" :complete="step > 3" color="deep-purple">
                    Confirmación
            </v-stepper-step>

            <v-stepper-content step="3">
                <OrderDetail @terminar="terminar($event)" @volver="volver($event)"/>
            </v-stepper-content>
        </v-stepper>

        <v-snackbar color="success" centered v-model="cartelAcept" style="position:absolute;" :timeout="5000">
            <div class="cartel">
                <div class="cartel-title">VeganEAT!</div>
                <v-icon class="ml-1">mdi-food-apple</v-icon>
            </div>
            <v-divider></v-divider>
            <div class="text-center mt-4">
                Muchas Gracias su compra!!
            </div>
        </v-snackbar>
    </div>
</template>

<script>
    import Address from '../Address/Address.vue'
    import PayOptions from '../PayOptions/PayOptions.vue'
    import OrderDetail from '../OrderDetail/OrderDetail.vue'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        data() {
            return {
                step: 1,
                cartelAcept: false
            }
        },

        methods: {
            siguiente(step) {
                this.step = step
            },

            volver(step) {
                this.step = step;
            },

            limpiarCarrito() {
                this.setCart([])
                localStorage.removeItem('cart')
            },

            terminar(step) {
                this.siguiente(step)
                this.cartelAcept = true

                setTimeout(() => {
                    this.cartelAcept = false
                    this.limpiarCarrito()
                    this.$router.push('/')
                }, 6000)
            }, 

            ...mapActions('carrito', ['setCart'])
        },

        components: {
            Address, PayOptions, OrderDetail
        },

        computed: {
            ...mapGetters('orden', ['order'])
        },
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');

    .required--text {
        color: red;
    }

    .cartel {
        display: flex;
        align-items: baseline;
        justify-content: center;
        font-size: 160%;
    }

    .cartel-title {
        font-family: 'Architects Daughter', cursive;
    }


</style>