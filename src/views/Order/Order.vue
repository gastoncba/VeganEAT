<template>
    <v-containner class="mt-12">
        <v-row>
            <v-col class="col-sm-12 col-xs-12 col-12 col-lg-6 col-xl-6 col-xxl-6">
                <StepOrder />
            </v-col>

            <v-col class="col-sm-12 col-xs-12 col-12 col-lg-6 col-xl-6 col-xxl-6">
                <v-card>
                    <v-card-text>
                    <div class="text-center row--title">
                        Pedido 
                    </div>
                    <div class="row mt-2">
                        <p><b>Total por productos:</b></p>
                        <p>$100</p>
                    </div>
                    <v-divider></v-divider>
                    <div class="row mt-2">
                        <p><b>Envio:</b></p>
                        <p>$50</p>
                    </div>
                    <v-divider></v-divider>
                    <div class="row row--total mt-2">
                        <p><b>Total:</b></p>
                        <p>$150</p>
                    </div>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-containner>
</template>

<script>
    import StepOrder from '../../components/StepOrder/StepOrder.vue'
    export default {
        components: {
            StepOrder,
        },
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&family=Fredoka+One&display=swap');
    @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
    .row{
        display: flex;
        justify-content: space-between;
    }
    .row--title {
        font-family: 'Architects Daughter', cursive;
        font-size: 1.5rem;
        color: black;
    }
    .row--total {
        font-family: 'Fredoka One', cursive;
        font-size: 1rem;
    }
    
</style>