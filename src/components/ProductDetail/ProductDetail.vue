<template>
    <v-dialog v-model="dialog" persistent>
        <v-card class="mx-auto" color="lighten-4" width="500">
            <v-img
            :aspect-ratio="16/9"
            height="200px"
            :src="product.img"
            >
            </v-img>
            <v-card-text class="pt-6" style="position: relative;">
            <v-btn v-if="stock"
                absolute
                color="#4E9F3D"
                class="white--text"
                fab
                large
                right
                top
                @click="agregarAlCarrito(product)"
            >
            <v-icon>mdi-cart</v-icon>
            </v-btn>
            <v-chip v-else color="red" dark class="mb-2">sin stock</v-chip>
            <h3 class="text-h4 mb-2 name-title" style="color: #4E9F3D">
            {{product.name}}
            </h3>

            <div class="mt-4 text-subtitle-1">
                <b>Precio:</b> $ {{product.price}} ARS
            </div>

            <div class="mt-2 text-subtitle-1">
                <b>Información:</b><br>
                {{product.desc}}
            </div>

            <div v-if="stock" class="selector-cant">
                <div class="mt-1 text-subtitle-1">
                    <b>Cantidad para llevar: </b>{{initial}}
                </div>
                <div class="selector-cant--buttons">
                    <v-btn icon color="#4E9F3D" @click="aumentar()"><v-icon size=30>mdi-plus-circle</v-icon></v-btn>
                    <v-btn icon color="#4E9F3D" @click="disminuir()"><v-icon size=30>mdi-minus-circle</v-icon></v-btn>
                </div>
            </div>

            <v-btn @click="volver()" color="#4E9F3D" dark class="mt-2">
                    cerrar
            </v-btn>
            </v-card-text>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {

        props: {
            dialog: {
                type: Boolean,
                default: true
            },

            product: {
                type: Object, 
                default: () => {}
            }, 

            stock: {
                type: Number,
                default: 1
            }, 

            initial: {
                type: Number,
                default: 1,
            }
        },

        methods: {
            volver() {
                this.$emit('volver')
                this.initial = 1
            },
            
            aumentar() {
                if(this.initial < this.stock) this.initial += 1 
            },
            
            disminuir() {
                if(this.initial != 1) this.initial -= 1
            },

            agregarAlCarrito(prod) {
                if(!this.prodInCart(prod)) {
                    const newProd = {...prod, cant: this.initial}
                    this.agregar(newProd)
                } else {
                    //El criterio que se utiliza es aumentar la cantidad para los repetidos
                    const repeated = this.carrito.find(item => item._id === prod._id)
                    repeated.cant += this.initial
                }
                this.volver()
            },

            prodInCart(prodSelect) {
                return this.carrito.some(item => item._id === prodSelect._id)
            },

            ...mapActions(['agregar'])
        }, 

        computed: {
            ...mapGetters(['carrito', 'products'])
        },
    }
</script>

<style scoped>
    .selector-cant, .selector-cant--buttons{
        display: flex;
        flex-direction: row;
    }

    .selector-cant--buttons{
       display: flex;
       align-items: baseline;
       margin-left: 20px;
    }
</style>