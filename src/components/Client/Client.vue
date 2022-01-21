<template>
    <div>   
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title>
                        Tus pedidos y promociones
                    </v-card-title>

                    <v-spacer></v-spacer>

                    <v-container>
                        <v-row>
                            <v-col v-for="(item,i) in items" :key="i" lg="6" sm="12" md="12" cols="12">
                                <v-card dark :color="item.color">
                                    <div class="d-flex flex-no-wrap justify-space-between">
                                        <div>
                                            <v-card-title class="text-h5">
                                                {{item.title}}
                                            </v-card-title>
                                            <v-card-subtitle>{{item.subtitle}}</v-card-subtitle>

                                            <v-card-actions>
                                                <v-btn
                                                v-if="item.title === 'Pedidos'"
                                                class="ml-2 mt-5 mb-2"
                                                outlined
                                                rounded
                                                small
                                                @click="verPedidos()"
                                                >
                                                mis pedidos
                                                </v-btn>

                                                <v-btn
                                                v-else
                                                class="ml-2 mt-5 mb-2"
                                                outlined
                                                rounded
                                                small
                                                >
                                                ver promociones
                                                </v-btn>
                                            </v-card-actions>
                                        </div>
                                        <v-icon v-if="item.title === 'Pedidos'" size="70" class="mr-4">mdi-food-apple</v-icon>
                                        <v-icon v-else size="70" class="mr-4">mdi-star-shooting</v-icon>
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        data() {
            return {
                items: 
                [
                    {
                        color: 'success',
                        title: 'Pedidos',
                        subtitle: 'Tus pedidos',

                    }, 
                    {
                        color: 'pink',
                        title: 'Promociones',
                        subtitle: 'Nuevas promociones'
                    }
                ]
            }
        },

        methods: {
            verPedidos() {
                this.$router.push(`/${this.user._id}/pedidos`)
            }
        },

        computed: {
            ...mapGetters('usuario',['user'])
        },
        
    }
</script>

<style scoped>

</style>