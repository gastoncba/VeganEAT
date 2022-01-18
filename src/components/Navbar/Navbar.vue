<template>
  <div>
    <v-app-bar
      :color="color"
      dense
      dark
      fixed
    >
    <v-container style="display:flex;" fluid>
      <v-app-bar-nav-icon @click="state = !state"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <router-link to="/" style="color: white; text-decoration: none;">
          <Logo />
        </router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }"> 
          <v-btn icon v-bind="attrs" v-on="on" @click="cartView = !cartView">
            <v-icon v-if="estaVacio()">mdi-cart</v-icon>
            <v-badge v-else :content="prodPorCantidad" color="deep-purple">
              <v-icon>mdi-cart</v-icon>
            </v-badge>
          </v-btn>
        </template>
        <span>Tu carrito!</span>
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
            <v-list-item-title class="ml-1">Iniciar sesion</v-list-item-title>
          </v-list-item>
          </router-link>
          
          <v-list-item @click="cerrarSesion()" v-else>
            <v-icon>mdi-arrow-left</v-icon>
            <v-list-item-title class="ml-1">Cerrar Sesion</v-list-item-title>
          </v-list-item>

          <router-link to="/register" style="color: white; text-decoration: none">
          <v-list-item>
            <v-icon>mdi-account-plus</v-icon>
            <v-list-item-title class="ml-1">Registrarse</v-list-item-title>
          </v-list-item>
          </router-link>
        </v-list>
      </v-menu>
    </v-container> 
    </v-app-bar>

    <!--vista de perfil-->
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

      <!--vista de caarrito-->
      <v-navigation-drawer v-model="cartView" right app temporary width="300">
        <v-list>
          
          <v-list-item>
            <v-list-item-title class="text-center cart-title">
              Su carrito
            </v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>

          <v-list-item>
            <v-list-item-content>
              <v-container fluid>
                <Cart v-if="!estaVacio()"/>
                <div v-else class="empty-cart text-center">
                  su carrito esta vacio!<br>
                  <v-icon color="red" size=35>mdi-emoticon-sad</v-icon>
                </div>
              </v-container>
            </v-list-item-content>
          </v-list-item>

        </v-list>
      </v-navigation-drawer>

      <v-snackbar color="success" centered v-model="logOut" :timeout="5000">
        <div class="log-out mt-1">
          <div class="log-out-title">VeganEAT!</div>
          <v-icon class="ml-1">mdi-food-apple</v-icon>
        </div>
        <v-divider class="mb-4"></v-divider>
        <div class="text-center">
          Hasta luego!!<br>
          Nos vemos pronto!!
        </div>
      </v-snackbar>
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
          group: null,
          cartView: false,
          logOut: false
        }
    }, 
    methods: {
      estaVacio() {
        return this.cantCarrito == 0;
      },
      
      cerrarSesion() {

        this.setToken(null)
        this.setUser(null)

        localStorage.removeItem('user')
        localStorage.removeItem('token')

        this.logOut = true
        setTimeout(()=> {
          this.logOut = false
          this.$router.push('/')
        }, 6000)

      }, 

      ...mapActions('usuario', ['setToken','setUser'])
    },

    computed: {
      ...mapGetters('carrito', ['cantCarrito', 'carrito']),
      ...mapGetters('usuario', ['user']),

      prodPorCantidad() {
        const cantProd = this.carrito.reduce((sumaTotal, prod) => {
          return prod.cant + sumaTotal
          }, 0)
        return cantProd
      }
    },
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&family=Fredoka+One&display=swap');
    .empty-cart{
      color: red;
      font-family: 'Fredoka One', cursive;
    }

    .cart-title {
      font-family: 'Fredoka One', cursive;
    }

    .log-out {
      display: flex;
      align-items: baseline;
      justify-content: center;
      font-size: 160%;
    }
    .log-out-title {
        font-family: 'Architects Daughter', cursive;
    }
  
</style>
