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
        
        <v-btn @click="step = 1" color="deep-purple" dark rounded class="ml-4">
            Pedir
        </v-btn>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {

        data() {
            return {
                selection: 0,
                horas: [],
            }
        },

        computed: {
            ...mapGetters(['order']),
            verSelection() {
                return this.selection
            }
        },

        methods: {
            volver() {
                this.$emit('volver', 2)
            }, 

            cargarHoras() {

                let mili = Date.now()
                const incremento = 1_800_000
                const fecha = new Date(mili)
                const hora = fecha.getHours() + ':' + fecha.getMinutes()
                this.horas.push(hora)

                for (let i = 0; i < 5; i++) {

                    const siguienteMili = mili + incremento
                    const siguienteFecha = new Date(siguienteMili)
                    let separador = ':'
                    if(siguienteFecha.getMinutes() < 10) separador = ':0'
                    const siguienteHora = siguienteFecha.getHours() + separador + siguienteFecha.getMinutes()
                    this.horas.push(siguienteHora)

                    mili = siguienteMili
                }
            }
        },

        filters: {
            formatoHora(value) {
                return value;
            }
        },
        mounted () {
            this.cargarHoras()
        },
    }
</script>

<style scoped>

</style>