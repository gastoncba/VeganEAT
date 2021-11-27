<template>
    <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="img"
      height="200px"
    ></v-img>

    <v-card-title>
      {{name}}
    </v-card-title>

    <v-card-actions>
      <v-btn
        color="#4E9F3D"
        text
      >
        Ver Información
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          {{desc}}
          <p><b>Precio:</b> ${{price}}</p>
          <v-btn color="#4E9F3D" dark>Agregar</v-btn>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
    export default {
        props:{
            name:{
                type:String,
            },
            desc: {
                type:String
            }, 
            img: {
                type:String
            }, 
            price: {
                type: Number
            }
        },
        methods: {
          agregar() {
            
          }, 
          eliminar() {
            
          }
        },
        data() {
            return {
                show:false
            }
        },
    }
</script>

<style scoped>

</style>