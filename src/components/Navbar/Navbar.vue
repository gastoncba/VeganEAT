<template>
  <div>
    <v-app-bar
      :color="color"
      dense
      dark
    >
      <v-app-bar-nav-icon>
        <Logo />
      </v-app-bar-nav-icon>

      <v-toolbar-title class="main-title">VeganEAT! </v-toolbar-title>

      <v-spacer></v-spacer>

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
          <v-list-item v-for="(item, i) in items" :key="i" @click="() => {}">
            <v-list-item-title>
              <v-icon v-if="item == 'carrito'">
                {{cartIcon}}
              </v-icon>
              <v-icon v-else>
                {{accountIcon}}
              </v-icon>
              {{item}}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<script>
    import Logo from '../Logo/Logo.vue'
    import { mdiAccount } from '@mdi/js'
    import { mdiCart } from '@mdi/js';
    export default {
    props: {
        color: {
            type: String,
            default: "#4E9F3D"
        }
    },
    components: {
      Logo
    },
    data: () => ({
      items: ['carrito', 'perfil'], 
      accountIcon: mdiAccount,
      cartIcon: mdiCart
  })}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
  .main-title {
    font-family: 'Architects Daughter', cursive;
    font-size: 200%;
  }
</style>
