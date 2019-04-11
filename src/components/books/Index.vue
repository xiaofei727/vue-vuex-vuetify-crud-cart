<template>
<v-container>
   <v-app id="inspire">
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Books</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Book</v-btn>
        </template>
        
        <!-- modal part -->
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                    <v-text-field v-model="editedBook.title" label="Title"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field  v-model="editedBook.author" label="Author"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-menu
                      ref="menu1"
                      v-model="menu1"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="editedBook.created_at"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field v-model="editedBook.created_at" label="Picker in menu" readonly v-on="on"></v-text-field>
                      </template>
                      <v-date-picker v-model="editedBook.created_at" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu1 = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu1.save(editedBook.created_at)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="editedBook.updated_at"
                      lazy
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="editedBook.updated_at"
                          label="Picker in menu"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="editedBook.updated_at" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
                        <v-btn flat color="primary" @click="$refs.menu2.save(editedBook.updated_at)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-text-field v-model="editedBook.price" label="Price"></v-text-field>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-checkbox label="Publish" color="success" v-model="editedBook.publish" hide-details></v-checkbox>
                  </v-flex>
                  <v-flex xs12 sm12 md12>
                    <v-textarea label="Description" textarea rows="5" auto-grow counter=4000 v-model="editedBook.description"></v-textarea>
                  </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
        <!-- end modal -->

      </v-dialog>
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="books"
      hide-actions
      :pagination.sync="pagination"
      style="text-align: center;"
    >
      <template v-slot:items="props" style="text-align: center !important;">
        <td>{{ props.item.title }}</td>
          <td>{{ props.item.description }}</td>
          <td>{{ props.item.author }}</td>
          <td>{{ props.item.created_at }}</td>
          <td>{{ props.item.updated_at }}</td>
          <td v-if="props.item.publish">Published</td>
          <td v-else>Not Published</td>
          <td>{{ props.item.price }}</td>
          <td>
            <v-icon small class="mr-2" color="success" @click="editItem(props.item)">Edit</v-icon>
            <v-icon small class="mr-2" color="error" @click="deleteItem(props.item)">Delete</v-icon>
            <v-icon small color="blue" @click="addBookToCart(props.item)">Add Cart</v-icon>
          </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </div>
   </v-app>
</v-container>
</template>
<script>
  export default {
    data: () => ({
      dialog: false,
      pagination: {
        rowsPerPage: 3,
        totalItems: 0
      },
      headers: [
        { text: 'Title', sortable: false, value: 'title', align: 'center' },
        { text: 'Description', value: 'description', align: 'center' },
        { text: 'Author', value: 'author', align: 'center' },
        { text: 'Create Date', value: 'created_at', align: 'center' },
        { text: 'Modify Date', value: 'updated_at', align: 'center' },
        { text: 'Publish', value: 'publish', sortable: false, align: 'center' },
        { text: 'Price($)', value: 'price', align: 'center' },
        { text: 'Actions', value: 'action', sortable: false, align: 'center' }
      ],
      editedIndex: -1,
      menu1: false,
      menu2: false,
      editedBook: {
        id:'',
        title: '',
        author: '',
        description: '',
        created_at: new Date().toISOString().substr(0, 10),
        updated_at: new Date().toISOString().substr(0, 10),
        publish: '',
        price: ''
      },
      defaultBook: {
        id: '',
        title: '',
        author: '',
        description: '',
        created_at: new Date().toISOString().substr(0, 10),
        updated_at: new Date().toISOString().substr(0, 10),
        publish: '',
        price: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Book' : 'Edit Book'
      },
      books(){
          return this.$store.state.book.books
      },
      pages () {
        if (this.pagination.rowsPerPage == null || this.pagination.totalItems == null) return 0

        this.pagination.totalItems = this.$store.state.book.books.length;
        
        return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    methods: {

      editItem (item) {
        this.editedIndex = this.books.indexOf(item);
        this.editedBook = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.$store.dispatch('removeBook', item);
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedBook = Object.assign({}, this.defaultBook)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        if (this.editedIndex > -1) {
          this.$store.dispatch('updateBook', this.editedBook);
        } else {
          this.$store.dispatch('addBook', this.editedBook);
        }
        this.close()
      },

      addBookToCart(item){
        this.$store.dispatch('addBookToCart', item);
      }
    }
  }
</script>