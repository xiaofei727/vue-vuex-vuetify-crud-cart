<template>
    <v-container>
        <v-data-table
            :headers="headers"
            :items="cart"
            hide-actions
            style="text-align: center;"
        >
            <template v-slot:items="props">
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.price }}</td>
                <td>{{ props.item.quantity }}</td>
            </template>
        </v-data-table>
        <v-alert :value="true" type="success" style="text-align: center;"><b>Total($): {{ total }}</b></v-alert>
        <p style="text-align: center;"><v-btn color="blue" class="white--text" @click="checkout">Check Out</v-btn></p>
    </v-container>
</template>
<script>
export default {
    data () {
      return {
        headers: [
          { text: 'Title', align: 'center', sortable: false, value: 'title' },
          { text: 'Price($)', align: 'center', value: 'price', sortable: false },
          { text: 'Quantity', align: 'center', value: 'quantity', sortable: false }
        ]
      }
    },
    computed: {
        cart () {
            return this.$store.state.cart.cart
        },
        total () {
            return this.$store.state.cart.cart.reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0);
        }
    },
    methods: {
      checkout(){
        alert('Pay us $' + this.total);
        this.$router.push("/books")
      }
    }
  }
</script>