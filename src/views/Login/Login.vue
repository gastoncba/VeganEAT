<template>
<v-container>
  <v-form ref="login" v-model="valid" lazy-validation>
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

    <p class="errorAlert" v-if="errorCartel">Usuario o Contraseña incorrecta</p>
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
    export default {
        data: () => ({
      
            //cartel de aviso si se encontro usuario
            errorCartel: false, 
            //repetido: false,

            valid: true,
            nickname: '',
            nicknameRules: [
                v => !!v || 'Nombre de usuario requerido'
            ],
            password: '',
            passwordRules: [
                v => !!v || 'Contraseña requerida'],
            users: 
            [
              {
                name: "Gastón",
                lastName: "Barrionuevo",
                nickname: "administrador",
                email:"admin@gmail.com",
                pass: "12345"
              }
            ]
            }),
            
            methods: {
            iniciarSesion() {
                if(this.$refs.login.validate()){
                    this.users.forEach(user => {
                      if(user.nickname == this.nickname && user.pass == this.password) {
                        this.$router.push('/main')
                        return
                      }          
                    })
                    this.errorCartel = true; 
                }
            },
            registrarse() {
              //vamos a la vista de registro
              this.$router.push("/register")
            }, 
            sacarRegistro() {
              this.stateRegister = false
            }, 

            agregar(user) {
  
              const estaUsuario = this.users.some(userReg => 
                  (userReg.nickname == user.nickname || userReg.email == user.email)) 
              if(!estaUsuario) {
                this.users.push(user)
                this.stateRegister = false
                this.dialog = false
              } else {
                this.repetido = true
              } 
            }
        }}
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

    .errorAlert {
      color: red;
    }
</style>