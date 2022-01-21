<template>
    <div>
        <v-stepper vertical v-model="step" style="position:relative;">
            <v-stepper-step step="1" :complete="step > 1" color="deep-purple">
                Dirección de entrega
            </v-stepper-step>
                    
            <v-stepper-content step="1">
                <Address @siguiente="siguiente($event)"/> 
            </v-stepper-content>

            <v-stepper-step step="2" :complete="step > 2" color="deep-purple">
                Forma de pago
            </v-stepper-step>

            <v-stepper-content step="2">
                <PayOptions @siguiente="siguiente($event)" @volver="volver($event)"/>
            </v-stepper-content>
   
            <v-stepper-step step="3" :complete="step > 3" color="deep-purple">
                    Confirmación
            </v-stepper-step>

            <v-stepper-content step="3">
                <OrderDetail @terminar="terminar($event)" @volver="volver($event)"/>
            </v-stepper-content>
        </v-stepper>

        <v-snackbar color="success" centered v-model="cartelAcept" style="position:absolute;" :timeout="5000">
            <div class="cartel">
                <div class="cartel-title">VeganEAT!</div>
                <v-icon class="ml-1">mdi-food-apple</v-icon>
            </div>
            <v-divider></v-divider>
            <div class="text-center mt-4">
                Muchas Gracias su compra!!<br>
                {{msgEntrega}}
            </div>
        </v-snackbar>
    </div>
</template>

<script>
    import Address from '../Address/Address.vue'
    import PayOptions from '../PayOptions/PayOptions.vue'
    import OrderDetail from '../OrderDetail/OrderDetail.vue'
    import {mapGetters, mapActions} from 'vuex'
    import axios from 'axios'
    export default {
        data() {
            return {
                step: 1,
                cartelAcept: false,
                msgEntrega: 'En unos momentos llegara a su domicilio!'
            }
        },

        props: {
            totalPagar: {
                type: Number,
                default: 1 
            },
        },

        methods: {
            siguiente(step) {
                this.step = step
            },

            volver(step) {
                this.step = step;
            },

            limpiarCarrito() {
                this.setCart([])
                localStorage.removeItem('cart')
            },

            terminar(step) {
                this.siguiente(step)

                if(this.order.tiempoEntrega !== 'Ahora') this.msgEntrega = `su pedido estara a las ${this.order.tiempoEntrega} hs`
                
                this.cartelAcept = true
                this.setOrder({...this.order, entregado: false, pago: this.totalPagar})
                console.log(this.order)
                setTimeout(()=>{
                        this.cartelAcept = false
                        this.limpiarCarrito()
                        this.$router.push('/')
                }, 6000)
                //Se crea una nueva orden
                // axios.post('https://api-vegan-eat.herokuapp.com/api/orders/create', this.order)
                // .then((response) => {
                //     this.setOrder({...this.order, id: response.data.order._id})
                //     this.actualizarStock()
                //     this.asociarUsuario()
                    
                // })
                // .catch((error)=>{
                //     console.log(error.response.data.error)
                // })
            }, 

            actualizarStock() {
                //se actualiza el stock de los productos
                this.carrito.forEach(item => {
                
                    const newStock = {stock: item.stock - item.cant}

                    axios.patch(`https://api-vegan-eat.herokuapp.com/api/products/update-stock/${item._id}`, newStock)
                    .then((response) => {
                        console.log(response.data)
                        setTimeout(()=>{
                            this.cartelAcept = false
                            this.limpiarCarrito()
                            this.$router.push('/')
                        }, 6000)
                    })
                    .catch((error) => console.log(error.response.data.error))
                })
            },

            asociarUsuario() {
                //se verfica si existe una cuenta abierta
                if(this.user) {
                    const newOrder = {orderID: this.order.id}
                    axios.patch(`https://api-vegan-eat.herokuapp.com/api/users/add-order/${this.user._id}`, newOrder)
                    .then((response) => console.log(response.data))
                    .catch((error) => console.log(error.response.data.error))
                }
            },

            ...mapActions('carrito', ['setCart']),
            ...mapActions('orden', ['setOrder'])
        },

        components: {
            Address, PayOptions, OrderDetail
        },

        computed: {
            ...mapGetters('orden', ['order']),
            ...mapGetters('carrito', ['carrito']),
            ...mapGetters('usuario', ['user'])
        },
    }
</script>

<style scoped>
    @import url('https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap');

    .required--text {
        color: red;
    }

    .cartel {
        display: flex;
        align-items: baseline;
        justify-content: center;
        font-size: 160%;
    }

    .cartel-title {
        font-family: 'Architects Daughter', cursive;
    }


</style>