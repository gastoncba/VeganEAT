<template>
    <div class="mt-12" v-if="user">
        <h1 class="text-center">Buenos días {{user.nickname}}!</h1>

        <!--aca se hace un condicional para verificar los roles del usuario
        por el momento aca se lo hace por nickname pero despues se va a cambiar--->
        <Admin v-if="user.nickname == 'administrador'" />
        <Client v-else />

    </div>
</template>

<script>
    import Admin from '../../components/Admin/Admin.vue'
    import Client from '../../components/Client/Client.vue'
    import {mapGetters} from 'vuex'
    export default {
        computed: {
            ...mapGetters('usuario', ['user'])
        },

        components: {
            Admin,Client
        },
    }
</script>

<style scoped>

</style>