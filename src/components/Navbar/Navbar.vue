<template>
  <div>
    <v-app-bar
      :color="color"
      dense
      dark
    >
      <v-app-bar-nav-icon @click="irAPrincipal()">
        <Logo />
      </v-app-bar-nav-icon>

      <v-toolbar-title class="main-title">VeganEAT! </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="administrador()">
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>

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
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i" @click="() => {}">
            <v-list-item-title @click="goRoute(item)">
              <v-icon v-if="item.name == 'carrito'">
                mdi-cart
              </v-icon>
              <v-icon v-else>
                mdi-account
              </v-icon>
              {{item.name}}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <Cart :stateCart="stateCart" @salir="salirDeVistaCarrito()"/>
  </div>
</template>

<script>
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
      data: () => ({
        items: [{name:'carrito'},
                {name:'login'}
              ],
        stateCart: false 
    }), 
    methods: {
      goRoute(item) {
        if(item.name == 'login') {
          this.$router.push(`/login`)
        } else {
          this.stateCart = true
        }
      },
      irAPrincipal() {
        this.$router.push('/')
      },

      administrador() {
        this.$router.push('/profile-admin')
      }, 

      salirDeVistaCarrito() {
        this.stateCart = false
      }
    },
  }
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
  .main-title {
    font-family: 'Architects Daughter', cursive;
    font-size: 200%;
  }
</style>
