<template>
    <div>
        <h1 class="text-center">Buenos Días!</h1>
        <h2 class="text-center">{{user.nickname}}</h2>

        <!--aca podemos hacer un condicional para verificar los roles del usuario
        por el momento aca se lo hace por nickname pero despues se va a cambiar-->
        <Admin v-if="user.nickname == 'administrador'" />

    </div>
</template>

<script>
    import Admin from '../../components/Admin/Admin.vue'
    import {mapGetters} from 'vuex'
    export default {
        computed: {
            ...mapGetters(['user'])
        },

        components: {
            Admin,
        },
    }
</script>

<style scoped>

</style>