<template>
    <v-dialog v-model="state" persistent max-width="290">
        <v-card>
            <v-card-title>
                Confirmación
            </v-card-title>
            <v-card-text>
                Seguro que desea {{operation}} esta comida ?
            </v-card-text>
            <v-spacer></v-spacer>

            <v-card-actions>
                <v-btn color="green darken-1" text @click="aceptar()">
                    aceptar
                </v-btn>

                <v-btn color="green darken-1" text @click="state = false">
                    cancelar
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                state: true
            }
        },

        props: {
            operation: {
                type: String,
                default: 'agregar'
            }
        },
        methods: {
            aceptar() {
                this.state = false
                this.$emit('confirmacion',this.operation)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>