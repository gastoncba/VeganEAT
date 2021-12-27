<template>
  <div>
    <v-app-bar
      :color="color"
      dense
      dark
    >
      <v-app-bar-nav-icon @click="state = !state"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/" style="color: white; text-decoration: none;">
          <Logo />
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <router-link to="/register" style="color: white; text-decoration: none">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-account-plus</v-icon>
            </v-btn>
          </router-link>
        </template>
        <span>Registrarse</span>
      </v-tooltip>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <router-link to="/login" style="color: white; text-decoration: none" v-if="!user">
          <v-list-item>
            <v-icon>mdi-account</v-icon>
            <v-list-item-title class="ml-1">Log In</v-list-item-title>
          </v-list-item>
          </router-link>
          
          <v-list-item @click="cerrarSesion()" v-else>
            <v-icon>mdi-arrow-left</v-icon>
            <v-list-item-title class="ml-1">Log Out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer v-model="state" app temporary>
            <v-list>
              <v-list-item class="px-2 ml-6">
                <v-list-item-avatar>
                  <v-img src="https://semantic-ui.com/images/avatar2/large/matthew.png"></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-list-item link v-if="user">
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    {{user.name}}
                  </v-list-item-title>
                  <v-list-item-subtitle>{{user.email}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>

              <v-list-item v-else>
                Hola! Bienvenid@!
              </v-list-item>

          </v-list>
        <v-divider></v-divider>
            <v-list nav dense>
                <v-list-item-group  v-model="group" active-class="deep-purple--text text--accent-4">
                
                  <v-expansion-panels>
                    <v-expansion-panel>
                      <v-expansion-panel-header hide-actions>
                        <v-list-item>
                        <div>
                          <v-icon v-if="estaVacio()">mdi-cart</v-icon>
                          <v-badge :content="this.cantCarrito" color="deep-purple accent-4" v-else>
                            <v-icon>mdi-cart</v-icon>
                          </v-badge>
                          carrito
                        </div>
                        <slot></slot>
                        </v-list-item>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <Cart v-if="!estaVacio()"/>
                        <div v-else class="empty-cart text-center">
                            carrito vacio!
                            <v-icon color="red" size=35>mdi-emoticon-sad</v-icon>
                        </div>
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>

                    <router-link to="/profile" style="color: white; text-decoration: none">
                    <v-list-item>
                        <div class="ml-6">
                          <v-icon>mdi-account</v-icon>
                          perfil
                        </div>
                    </v-list-item>
                    </router-link>
                    
                </v-list-item-group>
            </v-list>
      </v-navigation-drawer>
  </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import Cart from '../Cart/Cart.vue'
    import Logo from '../Logo/Logo.vue'
    export default {
      props: {
          color: {
              type: String,
              default: "#4E9F3D"
          }
      },
      components: {
        Logo, Cart
      },
      data() {
        return {
          state: false,
          group: null
        }
    }, 
    methods: {
      goRoute(item) {
        if(item.name == 'login') {
          this.$router.push(`/login`)
        } else {
          this.stateCart = true
        }
      },
      
      estaVacio() {
        return this.cantCarrito == 0;
      },
      
      cerrarSesion() {
        console.log('cerrando sesion...')

        this.setToken(null)
        this.setUser(null)

        localStorage.removeItem('user')
        localStorage.removeItem('token')

        this.$router.push('/')

      }, 

      ...mapActions(['setToken','setUser'])
    },

    computed: {
      ...mapGetters(['cantCarrito','user'])
    },
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&family=Fredoka+One&display=swap');
    .empty-cart{
      color: red;
      font-family: 'Fredoka One', cursive;
    }
  
</style>
