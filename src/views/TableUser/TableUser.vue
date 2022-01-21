<template>
    <v-container class="mt-12">
        <h1 class="text-center">Usuarios</h1>
        <v-progress-linear v-if="loading" indeterminate color="success">

        </v-progress-linear>
        
        <v-data-table v-else :headers="cabeceras" :items="users">

        </v-data-table>

    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                loading: true, 
                users: [],
                cabeceras: [
                    {
                        text: 'Usuario',
                        value: 'nickname',
                        sortable: false
                    }, 
                    {
                        text: 'Nombre', 
                        value: 'name',
                        sortable: false
                    }, 
                    {
                        text: 'Apellido', 
                        value: 'lastName',
                        sortable: false
                    },
                    {
                        text: 'Email',
                        value: 'email',
                        sortable: false
                    }, 
                ]
            }
        },

        methods: {
            getUsers() {
                axios.get('https://api-vegan-eat.herokuapp.com/api/users')
                .then((response) => {
                    this.users = response.data
                    this.loading = false
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        },

        mounted () {
            this.getUsers();
        },
    }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&family=Fredoka+One&display=swap');
    
    h1 {
        font-family: 'Fredoka One', cursive;
        font-size: 2em;
    }

</style>