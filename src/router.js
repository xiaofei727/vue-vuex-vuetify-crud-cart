import Vue from "vue";
import Router from "vue-router";
import store from "./store";
import VueSession from "vue-session";

import Login from "./components/auth/Login.vue";
import Register from "./components/auth/Register.vue";

// book router
import Book from "./components/books/Index.vue";

// cart router
import Cart from "./components/cart/Index.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requireSession: true
      }
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requireSession: true
      }
    },
    {
      path: "/books",
      name: "books",
      component: Book,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/cart",
      name: "cart",
      component: Cart,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

const options = {
  persist: true
}

Vue.use(VueSession, options);
const session = Vue.prototype.$session;


router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireSession)) {
    if (session.exists()) {
        next("/books");
        return;
    }
    next();
  } 
  else if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next();
      return;
    }
    next("/login");
  } 
  else {
    next();
  }
});

export default router;