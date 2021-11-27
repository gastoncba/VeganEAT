<template>
    <v-container>
        <h1 class="title-main">{{title}}</h1>
        <h4 class="title-main">{{subTitle}}</h4>
    </v-container>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: 'VeganEAT!'
            },
            subTitle: {
                type:String,
                default: 'Las mejores comidas veganas y vegetarianas'
            }
        },
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&family=Fredoka+One&display=swap');
    .title-main  {
        font-family: 'Fredoka One', cursive;
    }
</style>