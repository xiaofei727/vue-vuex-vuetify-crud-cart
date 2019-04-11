import Vue from "vue";
import Vuex from "vuex";

import { auth } from "@/store/modules/auth.js";
import { book } from "@/store/modules/book.js";
import { cart } from "@/store/modules/cart.js";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    book,
    cart
  },
  state: {},
  mutations: {},
  actions: {}
});