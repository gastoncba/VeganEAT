<template>
    <div>
        <div class="mt-1 grey--text" style="font-size: 16px;">
            Cantidad: {{initial}}
        </div>

        <div class="mt-1">
            <v-btn x-small icon @click="aumentar()" :disabled="!stock">
                <v-icon size="27">mdi-plus-circle</v-icon>
            </v-btn>

            <v-btn x-small icon @click="disminuir()" :disabled="!stock">
                <v-icon size="27" class="ml-4">mdi-minus-circle</v-icon>
            </v-btn>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                cant: this.initial
            }
        },

        props: {
            stock: {
                type: Number,
                default: 1 
            },
            initial: {
                type: Number,
                default: 1
            }
        },

        methods: {
            aumentar() {
                if(this.cant < this.stock) this.cant += 1
                console.log(this.initial)
                this.$emit('aumentar', this.cant)
            }, 

            disminuir() {
                if(this.cant != 1) this.cant -= 1
                
                this.$emit('disminuir', this.cant)
            }
        },
    }
</script>

<style scoped>

</style>