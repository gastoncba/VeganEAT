<template>
  <!-- <v-row justify="center"> -->
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <h4 class="login-title">Iniciar Sesión</h4>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="login" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Usuario"
                    v-model="nickname"
                    :rules="nicknameRules"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password"
                  v-model="password"
                  :rules="passwordRules"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            </v-form>
            <p class="errorCartel mt-2" v-if="errorCartel">Email o Constraseña incorrecta</p>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#4E9F3D" dark @click="iniciarSesion()">
            Iniciar Sesion
          </v-btn>

          <v-btn color="#4E9F3D" dark @click="registrarse()">
            Registrarse
          </v-btn>
        </v-card-actions>
      </v-card>
      <Register v-if="stateRegister" 
                @cancelarRegistro="sacarRegistro()" 
                @registrarUser="agregar($event)"
                :usuarioRepetido="repetido"/>
    </v-dialog>
  <!-- </v-row> -->
</template>

<script>
    import Register from '../Register/Register.vue'
    export default {
    components: { Register },
        data: () => ({
            //para estado del Dialog
            dialog:true,

            //cartel de aviso si se encontro usuario
            errorCartel: false, 
            repetido: false,

            //estado registro
            stateRegister: false,
            //datos del form de login
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
            iniciarSesion () {
                if(this.$refs.login.validate()){
                    this.users.forEach(user => {
                      if(user.nickname == this.nickname && user.pass == this.password) {
                        this.dialog = false
                        return
                      }          
                    })
                    this.errorCartel = true; 
                }
            },
            registrarse() {
              this.stateRegister = true
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
      font-size: 150%
    }
    .errorCartel {
      color: red;
    }
</style>