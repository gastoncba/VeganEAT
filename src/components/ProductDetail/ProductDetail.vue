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

            <v-tooltip bottom v-if="stock">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        v-bind="attrs"
                        v-on="on"
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
                </template>
                <span>Agregar!</span>
            </v-tooltip>
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
                    <v-btn color="#4E9F3D" @click="aumentar()" fab x-small class="white--text"><v-icon>mdi-plus</v-icon></v-btn>
                    <v-btn color="#4E9F3D" @click="disminuir()" fab x-small class="white--text ml-1"><v-icon>mdi-minus</v-icon></v-btn>
                </div>
            </div>

            <v-btn @click="volver()" color="#4E9F3D" dark class="mt-2">
                    cerrar
            </v-btn>
            </v-card-text>

            <v-snackbar v-model="snackbar" :timeout="5000" color="success" centered>
                <span>Listo! en tu carrito!</span>
            </v-snackbar>
        </v-card>
    </v-dialog>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex'
    export default {

        data() {
            return {
                initial: 1,
                snackbar: false
            }
        },

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
                    this.setCart([...this.carrito, {...prod, cant: this.initial}])
                } else {
                    //El criterio que se utiliza es aumentar la cantidad para los repetidos
                    const nuevoCarrito = this.carrito.map(item => {
                        if(item._id === prod._id) {
                            return {...item, cant: item.cant + this.initial}
                        } else {
                            return item
                        }
                    })
                    this.setCart(nuevoCarrito)
                }

                setTimeout(() => {
                    this.snackbar=true
                    setTimeout(() => {
                        this.volver()
                    }, 1000);
                }, 1000);
            },

            prodInCart(prodSelect) {
                return this.carrito.some(item => item._id === prodSelect._id)
            },

            ...mapActions('carrito', ['setCart'])
        }, 

        computed: {
            ...mapGetters(['products']),
            ...mapGetters('carrito', ['carrito'])
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