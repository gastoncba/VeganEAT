<template>
    <v-footer>
        <v-container class="px-10 container-footer">
            <h4>Síguenos en nuestra redes</h4>
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
</style>