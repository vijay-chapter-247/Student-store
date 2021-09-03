<template>
<v-container fluid tag="section">
    <v-row justify="center">
        <v-col cols="12" md="6" sm="8">
            <div class=" v-card--material pa-5 my-md-16 elevation-10 v-card v-sheet v-card--material--has-heading">
                <div class="d-flex grow flex-wrap">
                    <div class="v-card--material__heading mb-n5 elevation-6 success pa-5 rounded-lg" style="width: 100%">
                        <div class="text-h4 text-center white--text font-weight-bold">
                            Sign Up
                        </div>
                    </div>
                </div>
                <v-card-text class="mt-3">
                    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                        <v-form @submit.prevent="handleSubmit(onSubmit)">
                            <v-row>
                                <v-col cols="12" sm="12" md="6">
                                    <ValidationProvider v-slot="{ errors }" name="First name" rules="required|alpha|max:15">
                                        <v-text-field color="success" maxlength="20" v-model="first_name" :error-messages="errors" label="First Name" :counter="20" type="text" required>
                                        </v-text-field>
                                    </ValidationProvider>
                                </v-col>

                                <v-col cols="12" sm="12" md="6">
                                    <ValidationProvider v-slot="{ errors }" name="Last name" rules="required|alpha|max:20">
                                        <v-text-field color="success" maxlength="20" v-model="last_name" :error-messages="errors" label="Last Name" :counter="20" type="text" required>
                                        </v-text-field>
                                    </ValidationProvider>
                                </v-col>

                                <v-col cols="12">
                                    <ValidationProvider v-slot="{ errors }" name="Phone number" rules="required|digits:10|customPhoneNumber">
                                        <v-text-field color="success" type="phone" maxlength="10" v-model="phoneNumber" :counter="10" :error-messages="errors" label="Phone Number" required></v-text-field>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <ValidationProvider v-slot="{ errors }" name="Email" rules="required|email">
                                        <v-text-field color="success" v-model="email" :error-messages="errors" label="Email" type="email" required>
                                        </v-text-field>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <ValidationProvider v-slot="{ errors }" name="password" rules="required|customPassword">
                                        <v-text-field color="success" maxlength="20" v-model="password" :error-messages="errors" label="Password" :counter="20" :type="showPassword ? 'text' : 'password'" :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showPassword = !showPassword" required>
                                        </v-text-field>
                                    </ValidationProvider>
                                </v-col>
                                <v-col cols="12">
                                    <ValidationProvider v-slot="{ errors }" name="confirmPassword" rules="required|customConfirmPassword:@password">
                                        <v-text-field color="success" maxlength="20" label="Confirm Password" v-model="password_confirmation" :error-messages="errors" :counter="20" :type="showConfirmPassword ? 'text' : 'password'" :append-icon="
                          showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'" @click:append="showConfirmPassword = !showConfirmPassword" required></v-text-field>
                                    </ValidationProvider>
                                </v-col>

                                <v-col cols="12">
                                    <v-btn color="success" outlined block type="submit">Signup</v-btn>
                                </v-col>

                                <v-col cols="12">
                                    <v-btn color="success" outlined block to="login">Login</v-btn>
                                </v-col>
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
import { mapActions } from 'vuex'
import { required, email, min, max, alpha, digits } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";

setInteractionMode("eager");

extend("required", {
    ...required,
    message: "{_field_} can not be empty",
});

extend("digits", {
    ...digits,
    message: "{_field_} needs to be {length} digits",
});

extend("alpha", {
    ...alpha,
    message: "{_field_} can not containt any number, space or spacial characters",
});

extend("min", {
    ...min,
    message: "{_field_} must be {length} characters",
});

extend("max", {
    ...max,
    message: "{_field_} may not be greater than {length} characters",
});

extend("email", {
    ...email,
    message: "Email must be valid",
});

setInteractionMode("eager");

var errorMessage =
    "requires 1 of each of the following: uppercase letter, lowercase letter, number, special character (!@#$%^&*-)";
extend("customPassword", {
    message: (field) => `The ${field} ${errorMessage}`,
    validate: (value) => {
        var mustContainTheseChars =
            /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*-]).*$/;
        var notTheseChars = /["'?/<>\s]/;
        var containsRequiredChars = mustContainTheseChars.test(value);
        var containsForbiddenChars = notTheseChars.test(value);

        if (containsRequiredChars && !containsForbiddenChars) {
            return true;
        } else {
            if (containsForbiddenChars) {
                errorMessage = `contains forbidden characters: " ' + ? / < > or space`;
            } else {
                errorMessage = `min length 8 characters, and must include 1 uppercase letter, lowercase letter, number, special character (!@#$%^&*-)`;
            }
            return false;
        }
    },
});

var errorMessage_1 = "must same";
extend("customConfirmPassword", {
    params: ['target'],
    message: () => `Password ${errorMessage_1}`,
    validate(value, {
        target
    }) {
        return value === target;
    },
});

var errorPhoneNumber = "requires 10 digits";
extend("customPhoneNumber", {
    message: (field) => `The ${field} ${errorPhoneNumber}`,
    validate: (value) => {
        var mustContainTheseNumber = /^[6-9]{1}[0-9]{9}$/;
        var containsRequiredNumber = mustContainTheseNumber.test(value);
        if (containsRequiredNumber) {
            return true;
        } else {
            errorPhoneNumber = "is incorrect.";
            return false;
        }
    },
});

export default {
    components: { ValidationProvider, ValidationObserver },
    data: () => ({
        showPassword: false,
        showConfirmPassword: false,
        first_name: "",
        last_name: "",
        email: "",
        phoneNumber: null,
        password: "",
        password_confirmation: "",
    }),

    methods: {
        ...mapActions(['signup']),

        async onSubmit() {
            this.$refs.observer.validate();

            this.signup({
                first_name: this.first_name,
                last_name: this.last_name,
                email: this.email,
                phoneNumber: this.phoneNumber,
                password: this.password,
            })
            this.clear();

        },
        clear() {
            this.showPassword = false;
            this.showConfirmPassword = false;
            this.first_name = "";
            this.last_name = "";
            this.email = "";
            this.phoneNumber = null;
            this.password = "";
            this.password_confirmation = "";
            this.$refs.observer.reset();
        },
    },

    mounted() {
        if (localStorage.getItem('user-info')) {
            this.$router.push({ name: 'Home' })
        }
    }
};
</script>
