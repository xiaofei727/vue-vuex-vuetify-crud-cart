<template>
  <v-toolbar dark color="blue">
    <v-toolbar-side-icon></v-toolbar-side-icon>

    <v-toolbar-title class="white--text">My Vuetify Project</v-toolbar-title>

    <v-spacer></v-spacer>

    <router-link v-if="!isLoggedIn" :to="{ name: 'login'}" tag="v-btn">
        <v-btn color="black" flat style="background-color: white;">
          <span>Login</span>
        </v-btn>
    </router-link>
    <router-link v-if="!isLoggedIn" :to="{ name: 'register'}" tag="v-btn">
        <v-btn color="black" flat style="background-color: white;">
          <span>Register</span>
        </v-btn>
    </router-link>
    <router-link v-if="isLoggedIn" :to="{ name: 'books'}" tag="v-btn">
        <v-btn color="black" flat style="background-color: white;">
          <span>Books</span>
        </v-btn>
    </router-link>
    <router-link v-if="isLoggedIn" :to="{ name: 'cart'}" tag="v-btn">
        <v-btn color="black" flat style="background-color: white;">
          <span>Shopping Cart</span>
        </v-btn>
    </router-link>
    <v-btn v-if="isLoggedIn" color="black" flat style="background-color: white;" @click.prevent="logout">
        <span>Logout</span>
    </v-btn>
  </v-toolbar>
</template>
<script>
    export default {
        name: 'Navbar',
        computed: {
            isLoggedIn: function() {
                return this.$store.getters.isLoggedIn;
            }
        },
        methods: {
            logout: function() {
                this.$store.dispatch("logout").then(() => {
                    this.$session.destroy();
                    this.$router.push("/login");
                });
            }
        }
    }
</script>