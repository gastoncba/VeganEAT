<template>
    <div>
        <v-stepper vertical v-model="step">
            <v-stepper-step step="1" :complete="step > 1" color="deep-purple accent-4">
                Dirección de entrega
            </v-stepper-step>
                    
            <v-stepper-content step="1">
                <Address @siguiente="siguiente($event)"/> 
            </v-stepper-content>

            <v-stepper-step step="2" :complete="step > 2" color="deep-purple accent-4">
                Forma de pago
            </v-stepper-step>

            <v-stepper-content step="2">
                <PayOptions @siguiente="siguiente($event)" @volver="volver($event)"/>
            </v-stepper-content>
   
            <v-stepper-step step="3" :complete="step > 3" color="deep-purple accent-4">
                    Confirmación
            </v-stepper-step>

            <v-stepper-content step="3">
                <OrderDetail @volver="volver($event)"/>
            </v-stepper-content>
        </v-stepper>
    </div>
</template>

<script>
    import Address from '../Address/Address.vue'
    import PayOptions from '../PayOptions/PayOptions.vue'
    import OrderDetail from '../OrderDetail/OrderDetail.vue'
    export default {
        data() {
            return {
                step: 1,
            }
        },

        methods: {
            siguiente(step) {
                this.step = step
            },

            volver(step) {
                this.step = step;
            },
        },

        components: {
            Address, PayOptions, OrderDetail
        },
    }
</script>

<style scoped>
    .required--text {
        color: red;
    }
</style>