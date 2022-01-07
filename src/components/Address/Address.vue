<template>
    <v-form lazy-validation v-model="valid" ref="form">
                    <div class="mb-10 address-container">
                        <vue-google-autocomplete
                            ref="address"
                            id="map"
                            classname="form-control"
                            placeholder="Dirección 1 (*)"
                            v-on:placechanged="getAddressData"
                            country="ar"
                            class="address-input py-1"
                        >
                        </vue-google-autocomplete>
                        <div class="detail"></div>
                        <div class="message-address">
                            {{messageAddress}}
                        </div>
                    </div>

                    <v-text-field
                        v-model="address2"
                        label="Direccion 2"
                        hint="Piso y Departamento"
                        class="mb-6"
                    ></v-text-field>
                    
                    <v-text-field
                        v-model="nroDeTelefono"
                        label="Número de Celular (*)"
                        required
                        :rules="nroDeTelefonoRules"
                        hint="Teléfono celular"
                        class="mb-6"
                    ></v-text-field>    
                    
                    <v-text-field
                        v-model="infoExtra"
                        label="Información extra (ej: casa de rejas negras..)"
                    ></v-text-field> 

                    <v-btn color="deep-purple accent-4 mt-2" dark @click="validarDireccion()" rounded>
                        continuar
                    </v-btn>
        </v-form>
</template>

<script>    
    import VueGoogleAutocomplete from 'vue-google-autocomplete'
    import {mapGetters, mapActions} from 'vuex'
    export default {
        data() {
            return {
                valid: true,
                messageAddress: '',
                validAddress1: false,
                address1: null,
                address2: '',
                
                address2Rules: [
                    v => !!v.trim() || 'Calle requerida' 
                ],

                nroDeTelefono: '',
                nroDeTelefonoRules: [
                    v => !!v || 'Número de celular requerido',
                    v => /^(?:(?:00)?549?)?0?(?:11|[2368]\d)(?:(?=\d{0,2}15)\d{2})??\d{8}$/.test(v) || 'formato de celular no valido'
                ],
                infoExtra: '',
            }
        },

        methods: {
            validarDireccion() {
                if(!this.validAddress1) this.messageAddress = 'Ingrese una Dirección'

                if(this.$refs.form.validate()){
                    
                    const newOrder = {
                        address1: {
                            cuidad: this.address1.locality,
                            calle: this.address1.route,
                            nroCalle: this.address1.street_number,
                        }, 
                        address2: this.address2,
                        telefono: this.nroDeTelefono,
                        infoExtra: this.infoExtra
                    }
                    
                    this.setOrder({...this.order, ...newOrder})

                    this.$emit('siguiente', 2)
                }
            },
            
            getAddressData(addressData) {
                this.address1 = addressData
                console.log(this.address1)
            },
            validateAddress() {
                if(!this.address1.street_number || !this.address1.route || !this.address1.locality) {
                    this.messageAddress = 'Ingrese Calle y Número'
                    this.validAddress1 = false
                } else {
                    this.messageAddress = ''
                    this.validAddress1 = true
                }
            },
            ...mapActions(['setOrder'])
        }, 

        computed: {
            ...mapGetters(['order'])
        },

        components: {
            VueGoogleAutocomplete
        },

        watch: {
            address1() {
                this.validateAddress()
            }
        },
    }
</script>

<style scoped>
    #map {
        width: 100%;
        outline: none;
    }
    .detail {
        border-bottom: 1px solid rgb(179, 176, 176);
        transition: border-bottom .8s;
    }
    #map:hover+.detail {
        border-bottom: 1px solid rgba(0, 0, 0, 0.87);
    }
    #map:focus+.detail {
        border-bottom: 2px solid rgba(25,118,210);
        transition: border-bottom .1s;
    }

    .message-address {
        color: red;
        font-size: 12px;
    }
    

</style>