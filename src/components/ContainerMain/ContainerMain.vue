<template>
    <v-banner class="container-banner mx-4 mt-12" outlined>
        <h1 class="title-main my-6">{{title}}</h1>
        <h4 class="title-main">{{subTitle}}</h4>
    </v-banner>
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

    .container-banner {
        background-image: url('https://images.unsplash.com/photo-1526797072-6f5b4aec8421?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80');
        background-repeat: no-repeat;
        background-size:cover;
        background-position: center;
        height: 10rem;
        border-bottom-right-radius: 1rem !important;
        border-bottom-left-radius: 1rem !important;
    }
</style>