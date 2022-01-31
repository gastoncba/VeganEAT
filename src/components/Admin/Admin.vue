<template>
    <v-container class="mt-4" fluid>
        <v-row>
            <v-col>
                <v-card>
                    <h2 class="text-center title-users-orders">Usuarios y Pedidos</h2>
                
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
                                                <router-link 
                                                to="/admin-users"
                                                v-if="item.title == 'Usuarios'" 
                                                style="text-decoration: none;"
                                                >
                                                <v-btn
                                                class="ml-2 mt-5 mb-2"
                                                outlined
                                                rounded
                                                small
                                                >
                                                ver usuarios
                                                </v-btn>
                                                </router-link>

                                                <router-link 
                                                v-else
                                                to="/admin-orders" 
                                                style="text-decoration: none">
                                                <v-btn
                                                class="ml-2 mt-5 mb-2"
                                                outlined
                                                rounded
                                                small
                                                >
                                                ver pedidos
                                                </v-btn>
                                                </router-link>

                                            </v-card-actions>
                                            
                                        </div>
                                    <v-icon size="70" v-if="item.title == 'Usuarios'" class="mr-4">mdi-account</v-icon>
                                    <v-icon size="70" v-else class="mr-4">mdi-truck-fast</v-icon>
                                    </div>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    
    export default {
        data() {
            return {
                items: [
                    {
                        color: '#952175',
                        title: 'Usuarios',
                        subtitle: 'Administrador de usuarios',

                    }, 
                    {
                        color: '#1F7087',
                        title: 'Pedidos',
                        subtitle: 'Administrador de pedidos'
                    }
                ]
            }
        },
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
    
    .title-foods, .title-users-orders {
        font-family: 'Architects Daughter', cursive;
    }
</style>