<template>
    <div class="logo-container">
        <img src='../../assets/logo.png' alt="Logo de VeganEat" height='37px' width='37px' class="mt-1">
        <div class="title-logo ml-1">{{title}}</div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: 'VeganEAT!'
            },
        },
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');
    .logo-container {
        display: flex;
    }

    .title-logo {
        font-family: 'Architects Daughter', cursive;
        font-size: 150%;
    }
</style>