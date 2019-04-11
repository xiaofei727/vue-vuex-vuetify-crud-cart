<template>
    <div class="login-wrapper">
        <v-container fill-height style="margin-top: 165px;">
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="black">
                            <v-toolbar-title>Login</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form">
                                <v-text-field name="email" label="Email" type="email" v-model="email"  required></v-text-field>
                                <v-text-field name="password" label="Password" id="password" type="password" required v-model="password"></v-text-field>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="black" class="white--text" @click="login">Login</v-btn>
                                </v-card-actions>
                            </v-form>
                        </v-card-text>  
                    </v-card>
                    <v-alert :value="true" v-if="errorMessage" style="color: red !important; margin-top: 20px;" outline>
                        {{ errorMessage }}
                    </v-alert>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
      export default {
        data() {
            return {
                email: "",
                password: "",
                errorMessage: "",
            };
        },

        beforeCreate() {
			if (!this.$session.exists()) {
				this.$router.push('/login');
			}
        },
        
        methods: {
            login: function() {
                this.errorMessage = "";
                let data = {
                    user : {
                        email: this.email,
                        password: this.password
                    }
                };
                this.$store
                .dispatch("login", data)
                .then(() => {
                    this.$session.start();
                    this.$router.push("/books");
                })
                .catch((error) => {
                    let errors = error.response.data.error;
                    for (var key in errors) {
                        this.errorMessage += (errors[key][0]);
                    }
                    console.log(this.errorMessage);
                });
            }
        }
    };
</script>