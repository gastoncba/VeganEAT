<template>
    <v-footer color="#4E9F3D" dark padless class="mt-6">
        <v-card class="text-center lighten-1 white--text" flat style="width: 100%; background-color:#4E9F3D;">
            <v-card-text>
                <h3 class="text-center footer-title white--text">Síguenos en nuestras redes</h3>
                <v-btn v-for="(red,i) in redes" :key="i" icon>
                    <v-icon>{{red}}</v-icon>
                </v-btn>
            </v-card-text>
            
            <v-divider></v-divider>

            <v-card-text class="white--text">
                {{ new Date().getFullYear() }} — <strong>Vegan EAT</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
    export default {
        data() {
            return {
                redes: [
                    'mdi-facebook',
                    'mdi-instagram',
                    'mdi-twitter',
                ]
            }
        },
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap');
    .footer-title {
        font-family: 'Balsamiq Sans', cursive;
        font-size: 150%;
    }
</style>