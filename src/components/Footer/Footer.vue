<template>
    <v-footer color="#4E9F3D" dark class="mt-6">
        <v-container class="px-10 container-footer">
            <h4 class="footer-title">Síguenos en nuestras redes</h4>
            <v-col class="items">
                <v-row v-for="(red,i) in redes" :key="i">
                    <v-btn icon class="btn-icon">
                        <font-awesome-icon :icon="red.icon" />
                        {{red.name}}
                    </v-btn>
                </v-row>
            </v-col>
        </v-container>
    </v-footer>
</template>

<script>
    //importamos iconos de font awesome
    import { faFacebook } from '@fortawesome/free-brands-svg-icons'
    import { faInstagram } from '@fortawesome/free-brands-svg-icons'
    import { faTiktok } from '@fortawesome/free-brands-svg-icons'
    export default {
        data() {
            return {
                redes: [
                    {icon: faFacebook, name: "Facebook"},
                    {icon: faInstagram, name: "Instagram"},
                    {icon: faTiktok, name: "TikTok"}
                ]
            }
        },
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&display=swap');
    .container-footer{
        text-align: center;
    }

    .items{
        display: grid;
        justify-items: center;
    }

    .btn-icon{
        font-size: 1rem;
    }

    .footer-title {
        font-family: 'Balsamiq Sans', cursive;
        font-size: 150%;
    }
</style>