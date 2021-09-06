<template>
<v-container fluid tag="section">
    <v-row justify="center">
        <v-col cols="12" md="6" sm="8">
            <div class=" v-card--material pa-5 my-md-16 elevation-10 v-card v-sheet v-card--material--has-heading">
                <div class="d-flex grow flex-wrap">
                    <div class="v-card--material__heading mb-n5 elevation-6 success pa-5 rounded-lg" style="width: 100%">
                        <div class="text-h4 text-center white--text font-weight-bold">
                            Login
                        </div>
                    </div>
                </div>
                <v-card-text class="mt-3">
                    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                        <v-form @submit.prevent="handleSubmit(onSubmit)">
                            <v-row>
                                <v-col cols="12" class="mt-3">
                                    <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                                        <v-text-field color="success" v-model="email" :error-messages="errors" label="Email" type="email" required>
                                        </v-text-field>
                                    </ValidationProvider>
                                    <ValidationProvider v-slot="{ errors }" name="password" rules="required">
                                        <v-text-field color="success" maxlength="20" v-model="password" :error-messages="errors" label="Password" :counter="20" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" required>
                                        </v-text-field>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn color="success" outlined block type="submit">Login</v-btn>
                                </v-col>

                                <v-col cols="12">
                                    <v-btn color="success" outlined block to="signup">Signup</v-btn>
                                </v-col>

                                <!-- <v-col cols="12" class="{mx_recaptcha_failed: !rexapcha}">
                                    <vue-recaptcha sitekey='6LetNjgcAAAAAPgbPVTjDL_GcNw9C9Z50D7wCmX3' @verify="mxVerify"> </vue-recaptcha>
                                    <br>
                                    <small>Does't complete!</small>
                                </v-col> -->

                            </v-row>
                        </v-form>
                    </ValidationObserver>
                </v-card-text>
            </div>
        </v-col>
    </v-row>
</v-container>
</template>

<script>
import axios from "axios";
import { mapActions } from 'vuex'
import { required, email } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";

setInteractionMode("eager");

extend("required", {
    ...required,
    message: "{_field_} can not be empty",
});

extend("email", {
    ...email,
    message: "Email must be valid",
});

setInteractionMode("eager");

export default {
    components: { ValidationProvider, ValidationObserver },
    data: () => ({
        showPassword: false,
        showConfirmPassword: false,
        email: "",
        password: "",
        recaptcha: null
    }),

    methods: {
        ...mapActions(['login']),
        async onSubmit() {
            this.$refs.observer.validate();

            const data = {
                email: this.email,
                password: this.password
            }

            this.login(data);

            this.clear();
        },
        clear() {
            this.email = "";
            this.password = "";
            this.$refs.observer.reset();
        },

        // mxVerify(response) {
        //     console.log(response);
        //     this.recaptcha = response;
        // }
    },

    mounted() {
        if (localStorage.getItem('user-info')) {
            this.$router.push({ name: "Home" })
        }
    }
};
</script>
