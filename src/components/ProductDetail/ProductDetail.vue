<template>
    <v-hover v-slot="{ hover }">
    <v-card
      class="mx-auto my-12"
      color="grey lighten-4"
      max-width="600"
    >
      <v-img
        :aspect-ratio="16/9"
        src="https://firebasestorage.googleapis.com/v0/b/delivery-things.appspot.com/o/img_productos_veganEAT%2Fflan%20de%20coco.jpg?alt=media&token=3b058e30-5c33-4ef4-9c25-61463df8371f"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal text-h2 white--text"
            style="height: 100%;"
          >
            $14.99
          </div>
        </v-expand-transition>
      </v-img>
      <v-card-text
        class="pt-6"
        style="position: relative;"
      >
        <v-btn
          absolute
          color="orange"
          class="white--text"
          fab
          large
          right
          top
        >
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <div class="font-weight-light grey--text text-h6 mb-2">
          For the perfect meal
        </div>
        <h3 class="text-h4 font-weight-light orange--text mb-2">
          QW cooking utensils
        </h3>
        <div class="font-weight-light text-h6 mb-2">
          Our Vintage kitchen utensils delight any chef.<br>
          Made of bamboo by hand
        </div>
      </v-card-text>
    </v-card>
  </v-hover>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
    .v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: .5;
  position: absolute;
  width: 100%;
}
</style>