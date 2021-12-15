<template>
  <v-container>
    <v-form ref="register" v-model="valid" lazy-validation class="mx-lg-auto col-lg-8 mx-xl-auto col-xl-8 mx-md-auto col-md-6">
      <h1 class="reg-title">Registro</h1>
          <v-text-field
              label="Nombre"
              v-model="name"
              :rules="nameRules"
              :counter="15"
              required
          ></v-text-field>

          <v-text-field
              label="Apellido"
              v-model="lastName"
              :rules="lastNameRules"
              :counter="20"
              required
          ></v-text-field>

          <v-text-field
              label="Nickname"
              v-model="nickname"
              :rules="nicknameRules"
              :counter="15"
              required
          ></v-text-field>

          <v-text-field
              label="Email"
              v-model="email"
              :rules="emailRules"
              type="email"
              required
          ></v-text-field>

            <v-text-field
              label="Password"
              v-model="password"
              :rules="passwordRules"
              type="password"
              required
            ></v-text-field>

            <span>La constraseña debe ser:</span>
            <ul>
              <li>Minimo 8 caracteres</li>
              <li>Maximo 15</li>
              <li>Al menos una letra mayúscula</li>
              <li>Al menos una letra minucula</li>
              <li>Al menos un dígito</li>
              <li>No espacios en blanco</li>
              <li>Al menos 1 caracter especial</li>
            </ul>
      <p class="error-reg">{{error}}</p>
      <div>
        <v-btn color="#4E9F3D" dark @click="registrar()" class="mt-2 btn-reg">Registrarse</v-btn>
      </div>

      <div>
        <v-btn color="#4E9F3D" dark @click="cancelar()" class="mt-2 btn-back">Volver</v-btn>
      </div>
    </v-form>
  </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
              errorCartel: '', 
              dialog: true,

              //datos del form de registro
              valid: true,

              name: '',
              nameRules: [
                v => !!v || 'Nombre requerido',
                v => (v && v.length <= 15) || 'No mas de 15 caracteres' 
              ],

              lastName: '', 
              lastNameRules: [
                v => !!v || 'Apellido requerido',
                v => (v && v.length <= 20) || 'No mas de 20 caracteres'
              ],

              nickname: '',
              nicknameRules: [
                  v => !!v || 'Nickname requerido',
                  v => (v && v.length <= 15) || 'No mas de 15 caracteres'
              ],

              email: '',
              emailRules: [
                  v => !!v || 'E-mail requerido',
                  v => /.+@.+\..+/.test(v) || 'E-mail no valido'
              ],

              password: '',
              passwordRules: [
                  v => !!v || 'Contraseña requerida',
                  v=> /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.$($)$-$_])[A-Za-z\d$@$!%*?&#.$($)$-$_]{8,15}$/.test(v) || 'Password no valida'],
          }
        },

        methods: {
            registrar() {
                if(this.$refs.register.validate()) {
                  
                  const newUser = {
                    name: this.name,
                    lastName: this.lastName,
                    nickname: this.nickname,
                    email: this.email,
                    password: this.password
                }
                axios.post('https://api-vegan-eat.herokuapp.com/api/register', newUser)
                .then((response) => {
                  console.log(response.data)
                  this.$router.push('/')
                })
                .catch((error) => {
                  console.log(error.response.data.error)
                  this.errorCartel = error.response.data.error
                })
              }
            }, 
            cancelar() {
                this.$router.push('/')
            }
        },
        computed: {
          error() {
            return this.errorCartel
          }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
    .reg-title {
      font-family: 'Architects Daughter', cursive;
      font-size: 200%;
      text-align: center;
    }

    .error-reg {
      color:red
    }

    .btn-reg, .btn-back {
      width: 100%;
    }

</style>