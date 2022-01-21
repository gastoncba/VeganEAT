<template>
    <v-dialog v-model="payCardState" persistent>
        <v-card>
            <v-card-title>
                <h5 class="text-center">Agregar tarjeta</h5>
            </v-card-title>
            <v-card-text>
                <v-form lazy-validation v-model="valid" ref="cardForm" class="card-form" :disabled="disabledForm">
                    <div class="progress-container" v-if="loadingCard">
                        <v-progress-circular indeterminate color="purple">

                        </v-progress-circular>
                    </div>
                    <v-row>
                        <v-col cols="12">
                        <v-text-field 
                            label="Número de tarjeta"
                            v-model.number="nroCard"
                            :rules="nroCardRules">

                        </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="my-1">
                        <v-col cols="12">
                        <v-text-field 
                            label="CVC"
                            v-model.number="cvc"
                            :rules="cvcRules">

                        </v-text-field>
                        </v-col>
                    </v-row>

                    <div>
                        Expiración
                    </div>
                    
                    <v-row>
                        <v-col cols="6">
                            <v-select 
                                label="Mes"
                                v-model="month"
                                :items="months"
                                :rules="monthRules"
                            ></v-select>
                        </v-col>

                        <v-col cols="6">
                            <v-select 
                                label="Año"
                                v-model="year"
                                :items="years"
                                :rules="yearRules">

                            </v-select>
                        </v-col>
                    </v-row>

                    <v-snackbar color="red" centered :timeout="3000" v-model="snackbar">
                        <div class="text-center">
                            tarjeta vencida
                        </div>
                    </v-snackbar>

                    <div class="my-4">
                        <v-btn dark style="width:100%;" @click="validarTarjeta()">Validar Tarjeta</v-btn>
                    </div>

                    <div>
                        <v-btn dark @click="cerrar()" style="width:100%;">Cerrar</v-btn>
                    </div>
                </v-form>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {

        data() {
            return {
                snackbar: false,
                valid: true,
                loadingCard: false,
                disabledForm: false,
                validado: false,

                nroCard: '',
                nroCardRules: [
                    v => !!v || 'Número de tarjeta requerido',
                    v => /^(\d\s?){15,16}$/.test(v) || 'Número de tarjeta no valido'
                ],
                cvc: '',
                cvcRules: [
                    v => !!v || 'CVC requerido',
                    v => /^[0-9]{3,4}$/.test(v) || 'CVC invalido no valido'
                ],
                month: '',
                months: ['01', '02', '03', '04', '05', '06', '07' ,'08', '09', '10', '11', '12'],
                monthRules: [
                    v => !!v || 'Mes requerido'
                ],

                year: '',
                yearRules: [
                    v => !!v || 'Año requerido'
                ],
                years: ['2022', '2023', '2024', '2025', '2026']
            }
        },

        props: {
            payCardState: {
                type: Boolean,
                default: true
            },
        },

        methods: {
            cerrar() {
                this.$emit('cerrar', this.validado)
            }, 

            validarTarjeta() {
                if(this.$refs.cardForm.validate()) {
                    this.disabledForm = true
                    this.loadingCard = true
                    this.validado = true
                    this.procesarPago()
                }
            }, 

            procesarPago() {
                
                const vencimiento = new Date(this.year, this.month-1)
                const dateCurrent = new Date()

                console.log('fecha actual: ', dateCurrent)
                console.log('fecha de venc: ', vencimiento)

                setTimeout(() => {
                    this.loadingCard = false
                    this.disabledForm = false
                    if(!(dateCurrent >= vencimiento)) {
                        this.cerrar()
                    } else {
                        this.snackbar = true
                    }
                    this.validado = false
                }, 5000)
            }
        },
    }
</script>

<style scoped>
    .card-form, .progress-container {
        position: relative;
    }
    .progress-container {
        position: absolute;
        left: 45%;
        top: 45%;
    }
</style>