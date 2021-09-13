<template>
<div>
    <Header />
    <h1 class="text-center my-8 success--text">Hello {{ `${user.toUpperCase()}` }}, Welcome on Update page.</h1>

    <v-row justify="center">
        <v-col cols="12" md="6" sm="8">
            <div class=" v-card--material pa-5 elevation-10 v-card v-sheet v-card--material--has-heading">
                <div class="d-flex grow flex-wrap">
                    <div class="v-card--material__heading mb-n5 elevation-6 success pa-5 rounded-lg" style="width: 100%">
                        <div class="text-h4 text-center white--text font-weight-bold">
                            Update Student
                        </div>
                    </div>
                </div>
                <v-card-text class="mt-3">
                    <ValidationObserver ref="observer" v-slot="{ handleSubmit }">
                        <v-form @submit.prevent="handleSubmit(onSubmit)">
                            <v-row>
                                <v-col cols="12" class="mt-3">
                                    <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
                                        <v-text-field color="success" maxlength="100" v-model.trim="student.name" :error-messages="errors" label="Student Name" type="text" :counter="100" required>
                                        </v-text-field>
                                    </ValidationProvider>

                                </v-col>

                                <v-col cols="12" class="my-n5">
                                    <v-radio-group v-model="student.gender" row>
                                        <v-radio label="Male" color="success" value="boy"></v-radio>
                                        <v-radio label="Female" color="success" value="girl"></v-radio>
                                        <v-radio label="Other" color="success" value="other"></v-radio>
                                    </v-radio-group>
                                </v-col>

                                <v-col cols="12" md="6">

                                    <ValidationProvider v-slot="{ errors }" name="Class" rules="required">
                                        <v-select color="success" v-model.trim="student.class" :items="classes" :error-messages="errors" label="Student Class" data-vv-name="select" required></v-select>
                                    </ValidationProvider>
                                </v-col>

                                <v-col cols="12" md="6">
                                    <ValidationProvider v-slot="{ errors }" name="Section" rules="required">
                                        <v-select color="success" v-model.trim="student.section" :items="section" :error-messages="errors" label="Student Section" data-vv-name="select" required></v-select>
                                    </ValidationProvider>
                                </v-col>

                                <!-- <v-col cols="12" md="6">
                                    <ValidationProvider v-slot="{ errors }" name="Rating" rules="required">
                                        <v-select color="success" v-model.trim="student.rating" :items="student.items" :error-messages="errors" label="Student Rating" data-vv-name="select" required></v-select>
                                    </ValidationProvider>
                                </v-col> -->

                                <v-col cols="12">
                                    <ValidationProvider v-slot="{ errors }" name="Address" rules="required">
                                        <v-autocomplete color="success" auto-select-first v-model.trim="student.address" :items="city" :error-messages="errors" label="Student City"></v-autocomplete>
                                    </ValidationProvider>
                                </v-col>

                                <v-col cols="12">
                                    <ValidationProvider v-slot="{ errors }" name="Contact" rules="required|digits:10|customPhoneNumber">
                                        <v-text-field color="success" type="phone" maxlength="10" v-model.trim="student.contact" :counter="10" :error-messages="errors" label="Student Contact" required></v-text-field>
                                    </ValidationProvider>
                                </v-col>

                                <v-col cols="12">
                                    <v-btn color="success" outlined block type="submit">Update Student</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </ValidationObserver>
                </v-card-text>
            </div>
        </v-col>
    </v-row>
</div>
</template>

<script>
import axios from 'axios'
import { required, digits } from "vee-validate/dist/rules";
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from "vee-validate";
import Header from './Header.vue'
import { mapActions } from 'vuex'

setInteractionMode("eager");

extend("required", {
    ...required,
    message: "{_field_} can not be empty",
});

extend("digits", {
    ...digits,
    message: "{_field_} needs to be {length} digits",
});

var errorPhoneNumber = "requires 10 digits";
extend("customPhoneNumber", {
    message: (field) => `The ${field} ${errorPhoneNumber}`,
    validate: (value) => {
        var mustContainTheseNumber = /^[1-9]{1}[0-9]{9}$/;
        var containsRequiredNumber = mustContainTheseNumber.test(value);
        if (containsRequiredNumber) {
            return true;
        } else {
            errorPhoneNumber = "is incorrect.";
            return false;
        }
    },
});

setInteractionMode("eager");
export default {
    components: {
        Header,
        ValidationObserver,
        ValidationProvider
    },
    data() {
        return {
            user: '',
            classes: ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th', '11th', '12th'],
            section: ['A', 'B', 'C', 'D', 'E'],
            // items: [ 1, 2, 3, 4, 5 ],
            city: ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna', 'Ratlam', 'Rewa', 'Murwara', 'Singrauli', 'Burhanpur', 'Khandwa', 'Bhind', 'Chhindwara', 'Guna', 'Shivpuri', 'Vidisha', 'Chhatarpur', 'Damoh', 'Mandsaur', 'Khargone', 'Neemuch', 'Pithampur', 'Narmadapuram', 'Itarsi', 'Sehore', 'Morena', 'Betul', 'Seoni', 'Datia', 'Nagda', 'Dindori'],
            student: {
                name: '',
                gender: 'boy',
                class: '',
                section: '',
                // rating: '',
                address: '',
                contact: '',
            }

        }
    },
    methods: {

        ...mapActions(['updateAllStudent']),

        async onSubmit() {
            this.$refs.observer.validate();

            this.updateAllStudent({
                name: this.student.name,
                gender: this.student.gender,
                class: this.student.class,
                section: this.student.section,
                // rating: this.student.rating,
                address: this.student.address,
                contact: this.student.contact,
            });

            this.clear();
        },
        clear() {
            this.student.name = "";
            this.student.address = "";
            this.student.contact = "";
            this.student.section = "";
            // this.student.rating = "";
            this.student.class = "";
            this.$refs.observer.reset();
        },
    },
    async mounted() {

        const response = await axios.get("http://localhost:3000/student/" + this.$route.params.id);

        this.student = response.data;

        if (!(localStorage.getItem('user-info'))) {
            this.$router.push({ name: 'Signup' })
        } else {
            const user_name = JSON.parse(localStorage.getItem('user-info'))
            this.user = user_name.first_name + ' ' + user_name.last_name;
        }
    }
}
</script>
