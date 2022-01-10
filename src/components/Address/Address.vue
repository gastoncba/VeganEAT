<template>
    <v-form lazy-validation v-model="valid" ref="form" class="address-form">
                    <div class="address-container mb-10">
                        <vue-google-autocomplete
                            ref="address"
                            id="map"
                            name="map"
                            classname="form-control"
                            class="form-control py-1"
                            v-on:placechanged="getAddressData"
                            placeholder=""
                            country="ar"
                        >
                        </vue-google-autocomplete>
                        <label for="map" class="animated-label">Dirección 1 (*)</label>
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
                        label="Información extra"
                        hint="(ej: casa de rejas negras..)"
                    ></v-text-field> 

                    <v-btn color="deep-purple mt-2" dark @click="validarDireccion()" rounded>
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

                address1: {},
                address2: '',

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
                if(!this.validAddress1) {
                    this.cssClases = {"error":true}
                    this.validAddress1 = false
                    this.messageAddress = 'Ingrese Calle y Número'
                }

                if(this.$refs.form.validate() && this.validAddress1){
                    
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
                    this.validAddress1 = false
                } else {
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

<style lang="scss" scoped>

    .hintMode {
        color: rgba(0, 0, 0, 0.6);
    }
    .error {
        color: red
    }
    // .detail {
    //     border-bottom: 1px solid rgb(179, 176, 176);
    //     transition: border-bottom .8s;
    // }
    // #map:hover+.detail {
    //     border-bottom: 1px solid rgba(0, 0, 0, 0.87);
    // }
    // #map:focus+.detail {
    //     border-bottom: 2px solid rgba(25,118,210);
    //     transition: border-bottom .1s;
    // } 

    .address-form {

        .address-container {
            position: relative;
            padding-top: 16px;
            margin-bottom: 16px;
            .animated-label {
                position: absolute;
                top: 20px;
                left: 0;
                bottom: 0;
                z-index: 2;
                width: 100%;
                font-weight: 300;
                opacity: 1;
                cursor: text;
                transition: 0.2s ease all;
                margin: 0;
                -webkit-user-select: none;
                -moz-user-select: none;
                user-select: none;
                font-family: 'Roboto', sans-serif;
                &:after {
                    content: '';
                    position: absolute;
                    bottom: 0;
                    left: 45%;
                    height: 2px;
                    width: 10px;
                    visibility: hidden;
                    background-color:rgba(25,118,210);
                    transition: 0.2s ease all;
                }  
            } 
            // &.not-empty {
            //     animated-label {
            //         top: 0;
            //         font-size: 12px;
            //     }
            // }
            
            .form-control {
                width: 100%;
                position: relative;
                z-index: 1;
                border-radius: 0;
                border-width: 0 0 1px;
                //border-bottom-color: rgba(0,0,0,0.25) !important;
                border-bottom: 1px solid rgba(0,0,0,0.25)!important;
                height: auto;
                padding: 3px 0 5px;
                outline: none;
                &:focus {
                    box-shadow: none;
                    border-bottom-color: rgba(0,0,0,0.12);
                    ~ .animated-label {
                        top: 0;
                        opacity: 1;
                        color: rgba(25,118,210);
                        font-size: 12px;
                        &:after{
                            visibility: visible;
                            width: 100%;
                            left: 0;
                        }
                    }
                }
            }
        } 
    }
    
</style>