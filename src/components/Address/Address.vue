<template>
    <v-form lazy-validation v-model="valid" ref="form">
                    <v-select 
                        v-model="cuidad"
                        :items="cuidades"
                        label="Cuidad (*)"
                        :rules="cuidadRules"
                    ></v-select>

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
                        v-model="piso"
                        label="Piso"
                    ></v-text-field>
                    
                    <v-textarea
                        v-model="infoExtra"
                        label="Información extra (ej: casa de rejas negras..)"
                        auto-grow
                    ></v-textarea> 

                    <v-btn color="deep-purple accent-4" dark @click="validarDireccion()">
                        continuar
                    </v-btn>
        </v-form>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {

        data() {
            return {
                valid: true,

                cuidades: ['Córdoba', 'Buenos Aires', 'Santiago del Estero'],

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
                
                piso: '',
                infoExtra: ''
            }
        },

        methods: {
            validarDireccion() {
                if(this.$refs.form.validate()){
                    
                    const newOrder = {
                        cuidad: this.cuidad,
                        calle: this.calle,
                        puerta: this.nroDePuerta,
                        telefono: this.nroDeTelefono,
                        piso: this.piso,
                        infoExtra: this.infoExtra
                    }
                    
                    this.setOrder({...this.order, ...newOrder})

                    console.log(this.order)
                    this.$emit('siguiente', 2)
                }
            },

            ...mapActions(['setOrder'])
        }, 

        computed: {
            ...mapGetters(['order'])
        },
    }
</script>

<style scoped>

</style>