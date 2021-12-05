<template>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <h4 class="reg-title">Registro</h4>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-form ref="register" v-model="valid" lazy-validation>
            <v-row>
              <v-col cols="12">
                <v-text-field
                    label="Nombre"
                    v-model="name"
                    :rules="nameRules"
                    :counter="15"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Apellido"
                    v-model="lastName"
                    :rules="lastNameRules"
                    :counter="20"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Nickname"
                    v-model="nickname"
                    :rules="nicknameRules"
                    :counter="15"
                    required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                    label="Email"
                    v-model="email"
                    :rules="emailRules"
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
              </v-col>
            </v-row>
            </v-form>
            <p class="error-reg" v-if="usuarioRepetido">Nombre de usuario o Email ya registrado</p>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="#4E9F3D" dark @click="registrar()">
            Resgistrarse
          </v-btn>

          <v-btn color="#4E9F3D" dark @click="cancelar()">
            Volver
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
    export default {
        data() {
            return {
                dialog: true,
                nuevoUser: {},

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
                    this.nuevoUser = {
                    name: this.name,
                    lastName: this.lastName,
                    nickname: this.nickname,
                    email: this.email,
                    pass: this.password
                }
                this.$emit('registrarUser', this.nuevoUser)
                }
            }, 
            cancelar() {
                this.$emit('cancelarRegistro')
            }
        },
        props: {
            usuarioRepetido: {
                type: Boolean,
                default: false
            },
        },
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
    .reg-title {
      font-family: 'Architects Daughter', cursive;
      font-size: 200%
    }

    .error-reg {
      color:red
    }

</style>