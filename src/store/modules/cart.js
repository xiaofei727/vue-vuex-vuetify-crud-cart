
import { book } from "./book";

export const cart = {
  
  state: {
    items: book.books,
    cart: []
  },
  
  getters: {
    cartBooks: state => {
      return state.cart;
    }
  },
  
  mutations: {
    ADD_BOOK_TO_CART(state, payload) {
      var id = payload.id;
      const record = state.cart.find(item => item.id == id);
      if (!record) {
	      state.cart.push({
          id: payload.id,
          title: payload.title,
          price: payload.price,
	        quantity: 1
        });
	    } else {
	      record.quantity++;
      }
    }
  },
  
  actions: {
    addBookToCart({commit}, book){
      commit("ADD_BOOK_TO_CART", book)
    }
  }
}
