<template>
    <v-container>   
        <p class="text-center">Panel de modificación de Comidas</p>
        <p class="text-center">Comidas disponibles</p>
        <v-data-table :items="products" :headers="cabeceras" hide-default-footer>
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
            <p>{{cartel}}</p>
            
            <v-container class="col-12" v-if="stateCRUD">
                    <p class="text-center">{{title}}</p>
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

                    <v-btn color="green" @click="aceptar()" dark class="mt-4">
                        {{action}}
                    </v-btn>

                    <v-btn color="error" class="mt-4 ml-4" @click="cancelar()">
                        Cancelar
                    </v-btn>
                    </v-form>   
        </v-container>
        
        <Confirm :operation="action" v-if="stateConfirm" @confirmacion="ejecutar($event)"/>

    </v-container>
</template>

<script>
    import {mapGetters} from 'vuex'
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

                disableName: false,
                disableDesc:false,
                disablePrice:false,
                disableStock:false,
                disableImg: false,
                
                producto: {
                    id: '',
                    name: this.name,
                    desc: this.desc,
                    img: this.img,
                    price: this.price,
                    stock: this.stock,
                },
                
                valid: true,
                name: '',
                nameRules: [
                    v => !!v.trim() || 'El nombre requerido',
                    v => (v && v.length <= 50) || 'El nombre no debe tener mas de 30 caracteres',
                ],
                desc: '',
                descRules: [
                    v => !!v.trim() || 'Descripción requerida',
                    v => (v.trim() && v.trim().length <= 250) || 'La descripción no debe tener mas de 50 caracteres',
                ],

                //se hardcodea
                img: 'https://firebasestorage.googleapis.com/v0/b/delivery-things.appspot.com/o/img_productos_veganEAT%2Fflan%20de%20coco.jpg?alt=media&token=3b058e30-5c33-4ef4-9c25-61463df8371f',
                imgRules: [
                    v => !!v.trim() || 'Imagen requerida'
                ],

                price: '',
                priceRules:[
                    v => (!Number.isNaN(v*1)) || 'Ingrese un precio',
                ],
                stock: '',
                stockRules: [
                    v => (!!Number.isInteger(v))|| 'Debe ser número entero',
                ],
                
                products: [],
                cabeceras: [
                        {
                            text: "Nombre",
                            value: "name",
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
            getProducts() {
                axios.get('https://api-vegan-eat.herokuapp.com/api/products')
                .then((response) => this.products = response.data )
                .catch((error) => console.log(`error: ${error}`))
            }, 

            abrirFormCreate() {
                this.limpiar()
                this.habilitarCampos()
                this.value = true
                this.title = 'Agregar nuevo comida'
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
                    
                    if(this.producto.price < 0) this.producto.price *=-1
                    if(this.producto.stock < 0) this.producto.stock *=-1
                    
                    console.log(this.producto)
                    this.stateConfirm = true
                } 
            },
            ejecutar(action) {

                    const headers = {'x-access-token': this.token}

                    if(action === 'agregar') {
                        axios.post('https://api-vegan-eat.herokuapp.com/api/create', this.producto, {headers: headers})
                        .then((response) => {
                            this.cartel = response.data
                        })
                        .catch(error => {
                            this.cartel = error.response.data.error})
                    } else {
                        if(action == 'modificar') {
                        axios.put(`https://api-vegan-eat.herokuapp.com/api/update/${this.producto.id}`, this.producto, {headers: headers})
                        .then((response) => {
                            this.cartel = response.data
                        })
                        .catch((error) => {
                            this.cartel = error.response.data.error})
                        } 
                        else {
                            axios.delete(`https://api-vegan-eat.herokuapp.com/api/delete/${this.producto.id}`, {headers: headers})
                            .then((response) => {
                                this.cartel = response.data
                            })
                            .catch((error) => {
                                this.cartel = error.response.data.error})
                        }  
                    }

                    this.limpiar()
                    this.value = true
                    this.stateCRUD = false,
                    this.stateConfirm = false
            },

            limpiar() {
                this.name =  ''
                this.desc = ''
                this.img = 'https://firebasestorage.googleapis.com/v0/b/delivery-things.appspot.com/o/img_productos_veganEAT%2Fflan%20de%20coco.jpg?alt=media&token=3b058e30-5c33-4ef4-9c25-61463df8371f'
                this.price = ''
                this.stock = ''
            },

            habilitarCampos() {
                this.disableName = false
                this.disableDesc = false
                this.disablePrice = false
                this.disableStock = false
                this.disableImg = false
            },

            deshabilitarCampos() {
                this.disableName = true
                this.disableDesc = true
                this.disablePrice = true
                this.disableStock = true
                this.disableImg = true
            }
        }, 

        components: {
            Confirm,
        },

        computed: {
            ...mapGetters(['token'])
        },

        mounted () {
            this.getProducts();
        },
        updated() {
            this.getProducts()
        }
    }
</script>

<style scoped>
   

</style>