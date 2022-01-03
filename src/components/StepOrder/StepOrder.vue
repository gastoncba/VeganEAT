<template>
    <div>
        <v-stepper vertical v-model="step">
            <v-stepper-step step="1" :complete="step > 1" color="deep-purple accent-4">
                Dirección de entrega
            </v-stepper-step>
                    
            <v-stepper-content step="1">
                <v-form lazy-validation v-model="valid" ref="form">
                    <v-select 
                        v-model="cuidad"
                        :items="cities"
                        label="Cuidad (*)"
                        :rules="cuidadRules"
                    >
                    </v-select>

                    <v-text-field
                        v-model="calle"
                        label="Calle (*)"
                        required
                        :rules="calleRules"
                    ></v-text-field>
                    
                    <v-text-field
                        v-model.number="nroDePuerta"
                        label="Número de puerta (*)"
                        required
                        :rules="nroPuertaRules"
                    ></v-text-field>
                    
                    <v-text-field
                        v-model="nroDeTelefono"
                        label="Número de Celular (*)"
                        required
                        :rules="nroDeTelefonoRules"
                    ></v-text-field>    
                    
                    <v-text-field
                        label="Piso"
                    ></v-text-field>
                    
                    <v-text-field
                        label="Información extra"
                    ></v-text-field> 

                    <v-btn color="deep-purple accent-4" dark @click="validarDireccion()">
                        continuar
                    </v-btn>

                    </v-form>
                    
            </v-stepper-content>

            <v-stepper-step step="2" :complete="step > 2" color="deep-purple accent-4">
                Forma de pago
            </v-stepper-step>

            <v-stepper-content step="2">
                <div>
                    <v-radio-group v-model="tipoDePago">
                        <v-radio v-for="(pago,i) in pagos" :key="i" :label="pago" :value="pago" @click="agregarTarjeta()" color="deep-purple accent-4"></v-radio>
                    </v-radio-group>
                </div>
                
                <v-btn @click="step = 3" color="deep-purple accent-4" dark>
                    continuar
                </v-btn>

                <v-btn @click="step = 1" color="deep-purple accent-4" dark class="ml-4">
                    volver
                </v-btn>

            </v-stepper-content>
   
            <v-stepper-step step="3" :complete="step > 3" color="deep-purple accent-4">
                    Confirmación
            </v-stepper-step>
            <v-stepper-content step="3">

                <v-btn @click="step = 1" color="deep-purple accent-4" dark>
                    continuar
                </v-btn>

                <v-btn @click="step = 2" color="deep-purple accent-4" dark class="ml-4">
                    volver
                </v-btn>

            </v-stepper-content>
        </v-stepper>

        <PayCard :payCardState="ventanaTarjeta" @cerrar="cerrarVentanaTarjeta($event)"/>
    </div>
</template>

<script>
    import PayCard from '../PayCard/PayCard.vue'
    export default {
        data() {
            return {
                step: 1,
                valid: true,
                cities: [
                    'Córdoba',
                    'Buenos Aires',
                    'Santiago de Estero'
                ],

                pagos: ['Efectivo', 'Tarjeta'],

                tipoDePago: 'Efectivo', 

                ventanaTarjeta: false,

                cuidad: '',
                cuidadRules: [
                    v => !!v || 'Cuidad requerida'
                ],

                calle: '',

                calleRules: [
                    v => !!v.trim() || 'Calle requerida' 
                ],

                nroDePuerta: '',
                nroPuertaRules: [
                    v => !!v || 'Número de puerta requerido',
                    v => (!!Number.isInteger(v))|| 'Ingrese un número',
                    v => !(v >= 10_000) || 'menor a 10.000' ],

                nroDeTelefono: '',
                nroDeTelefonoRules: [
                    v => !!v || 'Número de celular requerido',
                    v => /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(v) || 'formato de celular no valido'
                ],
                Piso: '',
                InfoExtra: ''
            }
        },

        methods: {
            validarDireccion() {
                if(this.$refs.form.validate()){
                    this.step = 2
                }
            }, 

            agregarTarjeta() {
                if(this.esPagoConTarjeta()) {
                    //se abre dialog para validar datos de la tarjeta
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
                
                console.log(this.tipoDePago, validation)
                this.ventanaTarjeta = false
            }

        },

        components: {
            PayCard,
        },
    }
</script>

<style scoped>
    .required--text {
        color: red;
    }
</style>