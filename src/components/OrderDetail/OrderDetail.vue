<template>
    <div>
        <div class="text-center">
            <h3>Datos de Entrega</h3>
            <div v-if="order">
                <div class="text-subtitle-1">
                    <b>Cuidad:</b> {{order.address1.cuidad}}
                </div>
                <div class="text-subtitle-1">
                    <b>Calle:</b> {{order.address1.calle}} {{order.address1.nroCalle}}
                </div>
                <div class="text-subtitle-1">
                    <b>Telefono:</b> {{order.telefono}}
                </div>
            </div>
        </div>

        <v-divider class="my-4"></v-divider>

        <v-chip-group column v-model="selection" class="mb-2" active-class="deep-purple white--text">
            <v-chip>Ahora</v-chip>
            <v-chip v-for="(hora,i) in horas" :key="i">{{hora}}</v-chip>
        </v-chip-group>

        <v-btn @click="volver()" color="deep-purple" text rounded>
            volver
        </v-btn>
        
        <v-btn @click="stateConfirm = !stateConfirm" color="deep-purple" dark rounded class="ml-4">
            Pedir
        </v-btn>

        <v-dialog v-model="stateConfirm" persistent max-width="290">
            <v-card>
                <v-card-title>
                    Confirmación de compra
                </v-card-title>
                <v-card-text>
                    Seguro que desea confirmar la compra?
                </v-card-text>

                <v-spacer></v-spacer>

                <v-card-actions>
                    <v-btn color="green" dark @click="terminarCompra()">
                        Aceptar
                    </v-btn>

                    <v-btn color="green" text @click="stateConfirm = false">
                        Cancelar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    export default {

        data() {
            return {
                selection: 0,
                horas: [],
                stateConfirm: false
            }
        },

        computed: {
            ...mapGetters('orden', ['order']),
            verSelection() {
                return this.selection
            }
        },

        methods: {
            volver() {
                this.$emit('volver', 2)
            }, 

            terminarCompra() {
                if(this.selection === 0) {
                    this.setOrder({...this.order, tiempoEntrega: 'Ahora'})
                }
                else {
                    this.setOrder({...this.order, tiempoEntrega: this.horas[this.selection-1]})
                }

                this.stateConfirm = false
                this.$emit('terminar', 4)
            },

            cargarHoras() {

                let mili = Date.now()
                let i = 0

                const incremento = 900_000
                const fecha = new Date(mili)
                let separador = ':'
                let prefijo = ''
                if(fecha.getMinutes() < 10) separador = ':0'
                if(fecha.getHours() < 10) prefijo = '0'

                const hora = prefijo + fecha.getHours() + separador + fecha.getMinutes()
                this.horas.push(hora)

                while(i < 5) {
                    
                    const siguienteMili = mili + incremento
                    const siguienteFecha = new Date(siguienteMili)
                    
                    separador = ':'
                    prefijo = ''

                    if(siguienteFecha.getMinutes() < 10) separador = ':0'
                    if(siguienteFecha.getHours() < 10) prefijo = '0'

                    const siguienteHora = prefijo + siguienteFecha.getHours() + separador + siguienteFecha.getMinutes()
                    mili = siguienteMili

                    if (siguienteFecha.getHours() <= 8) continue

                    this.horas.push(siguienteHora)
                    i++
                }
            }, 

            ...mapActions('orden', ['setOrder'])
        },

        mounted () {
            this.cargarHoras()
        },
    }
</script>

<style scoped>

</style>