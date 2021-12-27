<template>
<v-container>
  <v-form ref="login" v-model="valid" lazy-validation class="mx-lg-auto col-lg-4 mx-xl-auto col-xl-6 mx-md-auto col-md-4">
    <h1 class="login-title">Iniciar Sesión</h1>
        <v-text-field
          label="Usuario"
          v-model="nickname"
          :rules="nicknameRules"
          required
        ></v-text-field>

        <v-text-field
          label="Password"
          v-model="password"
          :rules="passwordRules"
          type="password"
          required
        ></v-text-field>
    <small>usuario: administrador y password: 123456</small>
    <p class="alert">{{error}}</p>
    <div>
      <v-btn color="#4E9F3D" dark class="mt-2 btn-login" @click="iniciarSesion()">Iniciar Sesion</v-btn>
    </div>

    <div>
      <v-btn color="#4E9F3D" dark class="mt-2 btn-reg" @click="registrarse()">Registrarse</v-btn>
    </div>
  </v-form>
</v-container>

</template>

<script>
    import {mapActions} from 'vuex'
    import axios from 'axios'
    export default {
        data: () => ({
      
            //cartel de aviso si se encontro usuario
            errorCartel: '', 
            valid: true,
            nickname: '',
            nicknameRules: [
                v => !!v || 'Nombre de usuario requerido'
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Contraseña requerida'],
            
            }),
          
            methods: {
            ...mapActions(['setToken','setUser']),
            async iniciarSesion() {
                if(this.$refs.login.validate()){
                  
                  const user = {
                    nickname: this.nickname,
                    password: this.password
                  }

                axios.post('https://api-vegan-eat.herokuapp.com/api/login', user)
                .then((response) => {

                  this.setToken(response.data.data.token)
                  this.setUser(response.data.data.user)

                  localStorage.setItem('token', response.data.data.token)
                  localStorage.setItem('user', JSON.stringify(response.data.data.user))

                  this.$router.push('/')
                })
                .catch((error) => {
                  console.log(error.response.data.error)
                  this.errorCartel = error.response.data.error
                })
              }
            },
            registrarse() {
              this.$router.push("/register")
            }, 
        },
        computed: {
          error() {
            return this.errorCartel 
          },
        },
      }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');

    .login-title {
      font-family: 'Architects Daughter', cursive;
      font-size: 150%; 
      text-align: center;
    }

    .btn-login, .btn-reg {
      width: 100%;
    }

    .alert {
      color: red;
    }

</style>