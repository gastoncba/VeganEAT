<template>
    <div>
        <v-row>
            <v-col lg="6" sm="12" md="12" cols="12" class="d-flex justify-center">
                <v-card>
                    <v-card-title>
                        Panel de Comidas
                    </v-card-title>
                    <v-img
                        src="https://images.unsplash.com/photo-1520072959219-c595dc870360?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=990&q=80"    
                        class="white--text align-end"
                        gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                        height="230px"
                    >
                    <v-card-title>Comidas disponibles</v-card-title>
                    </v-img>
                    <v-card-actions>
                        <router-link to="/admin-foods" style="text-decoration: none">
                        <v-btn outlined
                                rounded
                                small
                        >
                        ir al panel
                        </v-btn>
                        </router-link>
                    </v-card-actions>
                </v-card>
            </v-col> 

            <v-col lg="6" sm="12" md="12" cols="12">
                <v-card>
                    <v-card-title>
                        Panel de usuarios y pedidos
                    </v-card-title>

                    <v-spacer></v-spacer>

                    <v-container>
                        <v-row>
                            <v-col cols="12" v-for="(item,i) in items" :key="i">
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
    </div>
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

</style>