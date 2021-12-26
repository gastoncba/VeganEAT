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

      <v-btn icon @click="administrador()">
        <v-icon>mdi-account-edit</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="state" app temporary>
            <v-list>
              <v-list-item class="px-2">
                <v-list-item-avatar>
                  <v-img src="https://randomuser.me/api/portraits/women/85.jpg"></v-img>
                </v-list-item-avatar>
              </v-list-item>

              <v-list-item link>
                <v-list-item-content>
                  <v-list-item-title class="text-h6">
                    Sandra Adams
                  </v-list-item-title>
                  <v-list-item-subtitle>sandra_a88@gmail.com</v-list-item-subtitle>
                </v-list-item-content>
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
                          <v-icon>mdi-cart</v-icon>
                          carrito
                        </div>
                        </v-list-item>
                      </v-expansion-panel-header>
                      <v-expansion-panel-content>
                        <Cart />
                      </v-expansion-panel-content>
                    </v-expansion-panel>
                  </v-expansion-panels>
             
                    <!-- <v-list-item>
                        <v-list-item-icon>
                            <v-icon>mdi-cart</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title>carrito</v-list-item-title>
                    </v-list-item> -->

                    <router-link to="/perfil" style="color: white; text-decoration: none">
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
      irAPrincipal() {
        this.$router.push('/')
      },

      administrador() {
        this.$router.push('/profile-admin')
      }, 
    },
  }
</script>

<style scoped>
  
</style>
