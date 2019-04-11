<template>
    <div class="login-wrapper">
        <v-container fill-height style="margin-top: 165px;">
            <v-layout align-center justify-center>
                <v-flex xs12 sm8 md4>
                    <v-card class="elevation-12">
                        <v-toolbar dark color="black">
                            <v-toolbar-title>Register</v-toolbar-title>
                        </v-toolbar>
                        <v-card-text>
                            <v-form ref="form">
                                <v-text-field name="name" label="Username" type="text"
                                            v-model="name"  required>
                                </v-text-field>
                                <v-text-field name="email" label="Email" type="email"
                                            v-model="email"  required>
                                </v-text-field>
                                <v-text-field name="password" label="Password" id="password"
                                            type="password" v-model="password" required>
                                </v-text-field>
                                <v-text-field name="password_confirmation" label="Confirm Password" id="password_confirmation"
                                            type="password" v-model="password_confirmation" required>
                                </v-text-field>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="grey" @click="register">Register</v-btn>
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
                name: "",
                email: "",
                password: "",
                password_confirmation: "",
                errorMessage: "",
            };
        },
        methods: {
            register: function() {
            this.errorMessage = "";
            let data = {
                user : {
                    name: this.name,
                    email: this.email,
                    password: this.password
                }
            };
            this.$store
                .dispatch("register", data)
                .then(() => {
                    this.$session.start();
                    this.$router.push("/books");
                })
                .catch((error) => {
                    let errors = error.response.data.errors;
                    for (var key in errors) {
                        this.errorMessage += key + " " + (errors[key][0]);
                    }
                });
            }
        }
    };
</script>