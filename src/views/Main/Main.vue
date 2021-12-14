<template>
    <div>
        <ContainerMain />
        <ProductList />
        <Footer />
    </div>
</template>

<script>
    import ContainerMain from '../../components/ContainerMain/ContainerMain.vue'
    import ProductList from '../../components/ProductList/ProductList.vue'
    import Footer from '../../components/Footer/Footer.vue'

    export default {
        components: {
            ContainerMain, ProductList, Footer
        },
    }
</script>

<style lang="scss" scoped>

</style>