<template>
<v-container class="mt-10">

  <v-snackbar color="success" centered style="position:absolute;" v-model="welcome" :timeout="5000">
      <div class="welcome mt-1">
        <div class="welcome-title">VeganEAT!</div>
        <v-icon class="ml-1">mdi-food-apple</v-icon>
      </div>
      <v-divider class="mb-4"></v-divider>
      <div v-if="user" class="text-center">
        Hola otra vez {{user.name}}!<br>
        Pasa y mira nuestras comidas ya!
      </div>
  </v-snackbar>

  <v-form ref="login" v-model="valid" lazy-validation class="mx-lg-auto col-lg-4 mx-xl-auto col-xl-6 mx-md-auto col-md-4" style="position: relative;">
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

        <div class="text-center" style="font-size: 15px;">
          <small>usuario: administrador y password: 123456</small><br>
          <small>usuario común: nico10 y password: Nicolas10#</small> 
        </div>
    <p class="alert">{{error}}</p>

    <v-container style="position:relative;">
    <div>
      <v-btn color="#4E9F3D" dark class="mt-2 btn-login" @click="iniciarSesion()" :disabled="buttonsState">Iniciar Sesion</v-btn>
    </div>

    <div class="progress-container" style="position: absolute; top:45%; left: 45%">
      <v-progress-circular indeterminate color="#4E9F3D" v-if="loading">

      </v-progress-circular>
    </div>

    <div>
      <v-btn color="#4E9F3D" dark class="mt-2 btn-reg" @click="registrarse()" :disabled="buttonsState">Registrarse</v-btn>
    </div>
    </v-container>

  </v-form>
</v-container>

</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    import axios from 'axios'
    export default {
        data: () => ({
      
            //cartel de aviso si se encontro usuario
            welcome: false,
            buttonsState: false,
            loading: false,
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
            ...mapActions('usuario', ['setToken','setUser']),

            async iniciarSesion() {
                if(this.$refs.login.validate()){
                  
                  this.buttonsState = true
                  this.loading = true

                  const user = {
                    nickname: this.nickname,
                    password: this.password
                  }

                axios.post('https://api-vegan-eat.herokuapp.com/api/auth/login', user)
                .then((response) => {

                  this.setToken(response.data.data.token)
                  this.setUser(response.data.data.user)

                  localStorage.setItem('token', response.data.data.token)
                  localStorage.setItem('user', JSON.stringify(response.data.data.user))
                  
                  this.welcome = true
                  setTimeout(()=>{
                    this.welcome = false
                    this.$router.push('/')
                  }, 6000)
                })
                .catch((error) => {
                  this.buttonsState = false
                  this.loading = false
                  this.errorCartel = error.response.data.error
                })
              }
            },
            registrarse() {
              this.$router.push("/register")
            }, 
        },
        computed: {

          ...mapGetters('usuario', ['user']),

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

    .welcome {
      display: flex;
      align-items: baseline;
      justify-content: center;
      font-size: 160%;
    }
    .welcome-title {
        font-family: 'Architects Daughter', cursive;
    }

</style>