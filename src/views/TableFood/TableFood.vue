<template>
    <v-container class="mt-12">   
        <h1 class="text-center">Comidas disponibles</h1>
        <v-progress-linear v-if="loading" indeterminate color="success">

        </v-progress-linear>
        <v-data-table :items="products" :headers="cabeceras" v-else>
                <template v-slot:item.points="{item}">
                    <td>
                        <v-rating
                        :value="item.points"
                        color="amber"
                        dense
                        half-increments
                        readonly
                        size="14"
                        >   
                        </v-rating>
                    </td>
                </template>
                <template v-slot:item.delete="{ item }">
                    <td>
                        <v-btn icon @click="abrirFormDelete(item)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
                    </td>
                </template>   
                <template v-slot:item.update="{ item }">
                    <td>
                        <v-btn icon @click="abrirFormUpdate(item)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                    </td>
                </template> 
            </v-data-table>
            <div class="col-12">
                <v-btn dark color="error" @click="abrirFormCreate()">agregar</v-btn>
            </div>
            <v-snackbar color="success" centered :timeout="3000" v-model="snackbar"> 
                <div class="text-center">
                {{cartel}}
                <v-icon class="ml-2">mdi-check</v-icon>
                </div>
            </v-snackbar>
            
            <v-dialog v-model="stateCRUD" persistent :width="width">
                <v-card class="col-lg-12">
                    <h2 class="text-center">{{title}}</h2>
                    <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                    v-model="name"
                    :counter="50"
                    :rules="nameRules"
                    label="Nombre"
                    required
                    :disabled="disableName"
                    ></v-text-field>

                    <v-textarea
                    v-model="desc"
                    :counter="250"
                    :rules="descRules"
                    label="Breve descripción"
                    auto-grow
                    required
                    :disabled="disableDesc"
                    ></v-textarea>

                    <v-text-field
                    v-model="img"
                    :rules="imgRules"
                    label="Imagen"
                    required
                    :disabled="disableImg"
                    ></v-text-field>

                    <v-text-field
                    v-model.number="price"
                    :rules="priceRules"
                    label="Precio"
                    required
                    :disabled="disablePrice"
                    ></v-text-field>

                    <v-text-field
                    v-model.number="stock"
                    :rules="stockRules"
                    label="Stock"
                    required
                    :disabled="disableStock"
                    ></v-text-field>

                    <v-text-field
                    v-model.number="points"
                    :rules="pointsRules"
                    label="Puntaje"
                    required
                    :disabled="disablePoints"
                    hint="puntaje menor o igual a 5"
                    >

                    </v-text-field>

                    <v-btn color="green" @click="aceptar()" dark class="mt-4">
                        {{action}}
                    </v-btn>

                    <v-btn color="error" class="mt-4 ml-4" @click="cancelar()">
                        Cancelar
                    </v-btn>
                    </v-form>  
                </v-card>
            </v-dialog>
        
        <Confirm :operation="action" v-if="stateConfirm" @confirmacion="ejecutar($event)"/>

    </v-container>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import axios from 'axios'
    import Confirm from '../../components/Confirm/Confirm.vue'
    export default {
        data() {
            return {
                stateCRUD: false,
                action: 'agregar',
                stateConfirm: false,
                title: '',
                cartel: '',
                loading: true,
                snackbar: false,

                disableName: false,
                disableDesc:false,
                disablePrice:false,
                disableStock:false,
                disableImg: false,
                disablePoints: false,
                
                producto: {
                    id: '',
                    name: this.name,
                    desc: this.desc,
                    img: this.img,
                    price: this.price,
                    stock: this.stock,
                    points: this.points
                },
                
                valid: true,
                name: '',
                nameRules: [
                    v => !!v || 'El nombre requerido',
                    v => (v && v.length <= 50) || 'El nombre no debe tener mas de 30 caracteres',
                ],
                desc: '',
                descRules: [
                    v => !!v || 'Descripción requerida',
                    v => (v && v.length <= 250) || 'La descripción no debe tener mas de 50 caracteres',
                ],

                //se hardcodea
                img: 'https://firebasestorage.googleapis.com/v0/b/delivery-things.appspot.com/o/img_productos_veganEAT%2Fflan%20de%20coco.jpg?alt=media&token=3b058e30-5c33-4ef4-9c25-61463df8371f',
                imgRules: [
                    v => !!v || 'Imagen requerida'
                ],

                price: '',
                priceRules:[
                    v => (!Number.isNaN(v*1)) || 'Ingrese un precio',
                    v => (!(v <= 0)) || 'Ingrese un valor positivo'
                ],
                stock: '',
                stockRules: [
                    v => (!!Number.isInteger(v))|| 'Debe ser número entero',
                    v => (!(v <= 0)) || 'Ingrese un valor positivo'
                ],
                points: '',
                pointsRules: [
                    v => (!Number.isNaN(v*1)) || 'Ingrese un número',
                    v => (!(v > 5.0 || v < 1.0)) || 'Ingrese un valor entre 1 y 5'
                ],
                
                products: [],
                cabeceras: [
                        {
                            text: "Nombre",
                            value: "name",
                            sortable: false
                        },
                        {
                            text: 'Puntaje', 
                            value: 'points', 
                            sortable: false
                        },
                        {
                            text: "Precio",
                            value: "price",
                            sortable: false
                        },
                        {
                            text: "Stock",
                            value: "stock",
                            sortable: false
                        },
                        {
                            text: "Eliminar",
                            value: "delete",
                            sortable: false
                        },
                        {
                            text: "Modificar",
                            value: "update",
                            sortable: false
                        }
                    ]
            }
        },

        methods: {
            ...mapActions(['setProducts']),

            getProducts() {
                axios.get('https://api-vegan-eat.herokuapp.com/api/products')
                .then((response) => {
                    this.products = response.data 
                    this.loading = false
                    this.setProducts(response.data) //para que se actualice con la otra vista
                    
                })
                .catch((error) => console.log(`error: ${error}`))
            }, 

            abrirFormCreate() {
                this.limpiar()
                this.habilitarCampos()
                this.value = true
                this.title = 'Agregar nueva comida'
                this.confirm = ''
                this.stateCRUD = true
                this.action = 'agregar'
            },
            abrirFormUpdate(item) {
                this.limpiar()
                this.habilitarCampos()
                this.title = 'Modificar comida'
                this.stateCRUD = true
                this.action = 'modificar'

                this.name =  item.name
                this.desc = item.desc
                this.img = item.img
                this.price = item.price
                this.stock = item.stock
                this.points = item.points

                this.producto.id = item._id
            },

            abrirFormDelete(item) {

                this.limpiar()
                this.title = 'Eliminar comida'
                this.stateCRUD = true
                this.action = 'eliminar'

                this.name =  item.name
                this.desc = item.desc
                this.img = item.img
                this.price = item.price
                this.stock = item.stock
                this.points = item.points
                
                this.deshabilitarCampos()

                this.producto.id = item._id
            },

            cancelar() {
                this.title = ''
                this.cartel = ''
                this.stateCRUD = false
                this.limpiar()
            },
            aceptar(){ 
                if(this.$refs.form.validate()) {  

                    this.producto.name = this.name
                    this.producto.desc = this.desc
                    this.producto.img = this.img
                    this.producto.price = this.price
                    this.producto.stock = this.stock
                    this.producto.points = this.points
                    
                    this.stateConfirm = true
                } 
            },
            ejecutar(action) {
                    const headers = {'x-access-token': this.token}

                    if(action === 'agregar') {
                        axios.post('https://api-vegan-eat.herokuapp.com/api/products/create', this.producto, {headers: headers})
                        .then((response) => {
                            this.cartel = response.data
                            this.getProducts()
                        })
                        .catch(error => {
                            this.cartel = error.response.data.error
                        })
                        .finally(() => {
                            this.snackbar = true
                        })
                    } else {
                        if(action === 'modificar') {
                            axios.put(`https://api-vegan-eat.herokuapp.com/api/products/update/${this.producto.id}`, this.producto, {headers: headers})
                            .then((response) => {
                                this.cartel = response.data
                                this.getProducts()
                            })
                            .catch((error) => {
                                this.cartel = error.response.data.error
                            })
                            .finally(() => {
                                this.snackbar = true
                            })
                        } 
                        else {
                            axios.delete(`https://api-vegan-eat.herokuapp.com/api/products/delete/${this.producto.id}`, {headers: headers})
                            .then((response) => {
                                this.cartel = response.data
                                this.getProducts()
                            })
                            .catch((error) => {
                                this.cartel = error.response.data.error
                            })
                            .finally(() => {
                                this.snackbar = true
                            })
                        }  
                    }

                    this.limpiar()
                    this.value = true
                    this.stateCRUD = false,
                    this.stateConfirm = false

                    setTimeout(()=>{
                        this.snackbar = false
                    }, 5000)
            },

            limpiar() {
                this.name =  ''
                this.desc = ''
                this.img = 'https://firebasestorage.googleapis.com/v0/b/delivery-things.appspot.com/o/img_productos_veganEAT%2Fflan%20de%20coco.jpg?alt=media&token=3b058e30-5c33-4ef4-9c25-61463df8371f'
                this.price = ''
                this.stock = ''
                this.points = ''
            },

            habilitarCampos() {
                this.disableName = false
                this.disableDesc = false
                this.disablePrice = false
                this.disableStock = false
                this.disableImg = false
                this.disablePoints = false
            },

            deshabilitarCampos() {
                this.disableName = true
                this.disableDesc = true
                this.disablePrice = true
                this.disableStock = true
                this.disableImg = true
                this.disablePoints = true 
            },

        }, 

        components: {
            Confirm,
        },

        computed: {
            ...mapGetters('usuario', ['token']),

            width () {
                switch (this.$vuetify.breakpoint.name) {
                    case 'xs': 
                        return "100vw"
                    case 'sm': 
                        return "100vw"
                    case 'md': 
                        return "100vw"
                    case 'lg': 
                        return "50vw"
                    case 'xl': 
                        return "50vw"
                    default: 
                        return "50vw"
                }
            },
        },

        mounted () {
            this.getProducts();
        },
    }
</script>

<style scoped>

    @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans&family=Fredoka+One&display=swap');
    
    h1 {
        font-family: 'Fredoka One', cursive;
        font-size: 2em;
    }
</style>