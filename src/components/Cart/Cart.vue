<template>
    <v-dialog v-model="stateCart" width="470" persistent>
        <v-list>
            <h1 class="title-cart">Tu Carrito</h1>
            <v-col>
                <v-card class="mx-auto mb-10">
                    <v-img
                        height="250"
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                        ></v-img>
                    <v-card-title>Cafe Badilico</v-card-title>
                    <v-card-text>
                        <v-row align="center" class="mx-0">
                            <div>
                               <b>precio:</b> $100 <br>
                               <b>cantidad:</b> 2 <br>
                               <b>Sub Total:</b> $200 <br>
                                <v-btn icon class="ml-6" dark color="error">
                                    <v-icon>
                                        mdi-delete
                                    </v-icon>
                                    eliminar
                                </v-btn>
                            </div>
                        </v-row>
                    </v-card-text>
                </v-card>
                <v-card class="mx-auto mb-10">
                    <v-img
                        height="250"
                        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                        ></v-img>
                    <v-card-title>Cafe Badilico</v-card-title>
                    <v-card-text>
                        <v-row align="center" class="mx-0">
                            <div>
                               <b>precio:</b> $100 <br>
                               <b>cantidad:</b> 2 <br>
                               <b>Sub Total:</b> $200 <br>
                               <v-btn icon class="ml-6" dark color="error">
                                    <v-icon>
                                        mdi-delete
                                    </v-icon>
                                    eliminar
                                </v-btn>
                            </div>
                        </v-row>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-divider></v-divider>
            <div class="total">Total: $100</div>
            <div>
                <v-btn color="red" dark>
                <v-icon color="white">mdi-truck-delivery</v-icon>
                realizar envio
                 </v-btn>
                <v-btn dark>
                    salir
                </v-btn>
            </div>
        </v-list>
    </v-dialog>
</template>

<script>
    export default {
        props: {
            stateCart: {
                type: Boolean,
                default: false
            },
        },
    }
</script>

<style scoped>
    .title-cart, .total{
        text-align: center;
    }
</style>