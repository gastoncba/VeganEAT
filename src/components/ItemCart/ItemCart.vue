<template>
    <div>
        <div class="title-item">
            {{item.name}}
        </div>
        <div class="row mt-2">
            <p><b>Precio:</b></p>
            <p>${{item.price}}</p>
        </div>
        <v-divider></v-divider>
        <div class="row mt-2">
            <p><b>Cantidad:</b></p>
            <p>X{{item.cant}}</p>
        </div>
        <v-divider></v-divider>
        <div class="row mt-2">
            <p><b>Subtotal:</b></p>
            <p>${{item.price*item.cant|truncar}}</p>
        </div>
        <v-divider></v-divider>
    </div>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                default: () => {}
            },
        },

        filters: {
            truncar(value) {
                return Math.floor(value*10)/10
            }
        }
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&family=Fredoka+One&display=swap');

    .title-item{
        text-align: center;
        font-family: 'Fredoka One', cursive;
    }
    .row {
        display: flex;
        justify-content: space-between;
    }

</style>