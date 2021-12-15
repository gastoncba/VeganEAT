<template>
    <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      :src="product.img"
      height="200px"
    ></v-img>

    <v-card-title>
      {{product.name}}
    </v-card-title>

    <v-card-actions>
      <v-btn color="#4E9F3D" dark @click="verInfo()">
        Ver Información
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    export default {
        props:{
            product: {
              type: Object,
              default: () => {} 
            },
        },
        methods: { 
          verInfo() {
            this.$router.push(`/detail/${this.product._id}`)
            console.log(this.product._id)
          }
        }
    }
</script>

<style scoped>

</style>