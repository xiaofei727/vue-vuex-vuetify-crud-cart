//import axios from "axios";

export const book = {
    state: {
      books: []
    },
    mutations: {
        ADD_BOOK(state, book) {
            state.books.push({
                id: this.getters.newBookId,
                title: book.title,
                description: book.description,
                author: book.author,
                created_at: book.created_at,
                updated_at: book.updated_at,
                publish: book.publish,
                price: book.price
            });
        },
        UPDATE_BOOK(state, payload){
            state.books = state.books.map(book => {
                if (book.id === payload.id) {
                    return Object.assign({}, book, payload)
                }
                return book;
            })
        },
        REMOVE_BOOK(state, book){
            var books = state.books;
            var id = book.id;
            var index = state.books.findIndex(book => book.id == id)
            books.splice(index, 1);
        },
    },
    actions: {
        getBook({commit}, book){
            commit('GET_BOOK', book)
        },
        addBook({commit}, book){
            commit('ADD_BOOK', book)
        },
        updateBook({commit}, payload){
            commit('UPDATE_BOOK', payload)
        },
        removeBook({commit}, book){
            commit('REMOVE_BOOK', book)
        },
    },
    getters: {
      books: state => state.books,
      newBookId(state) {  return state.books.length > 0 ? state.books[state.books.length-1].id + 1 : 1; },
    }
}