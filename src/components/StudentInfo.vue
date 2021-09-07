<template>
<div>
    <Header />
    <h1 class="text-center my-8 success--text">Hello Welcome {{ `${user}` }}, on All Student Details page.</h1>
    <v-container>
        <v-row>
            <!-- <v-row justify="center" class="text-h6">
                <p text dense v-if="loading" class="mt-15">Loading...</p>
                <p v-else-if="!loading && (!allStudents || allStudents.length === 0)" class="mt-15">
                    No team found.
                </p>
            </v-row> -->
            <v-col cols="12" sm="6" md="4" v-for="student in allStudents" :key="student.id">
                <v-hover v-slot="{ hover }" open-delay="200">
                    <v-card flat class="text-center rounded-md pa-3" style="border: 1px solid #4caf51" :elevation="hover ? 8 : 2">
                        <v-avatar size="100" style="border: 1px solid #4caf51">
                            <img v-if="student.gender === 'Male'" src="./boy.png" class="success lighten-4" />
                            <img v-else src="./girl.png" class="success lighten-4" />
                        </v-avatar>

                        <v-card-text class="body-1 text-capitalize success--text">
                            <div>Name - {{ student.name }}</div>
                            <div>Gender - {{ student.gender }}</div>
                            <div>Class - {{ student.class }} ({{ student.section }}) </div>
                            <div>City - {{ student.address }}</div>
                            <div>Contact - {{ student.contact }}</div>
                            <div>
                                <v-rating v-model="student.rating" background-color="green lighten-2" color="green" readonly length="5" size="20"></v-rating>
                            </div>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn outlined block color="success" :to="`update-student/${student.id}`">
                                Edit
                            </v-btn>
                            <v-spacer></v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import axios from 'axios'
import Header from './Header.vue'
import { mapGetters } from 'vuex';

export default {
    components: {
        Header
    },
    data() {
        return {
            user: '',
            // rating: '5'
        }
    },
    computed: {
        ...mapGetters(['allStudents'])
    },

    methods: {

        async checkLoginStatus() {
            let result = await axios.get("http://localhost:3000/Student");
            this.Student = result.data;
            if (!(localStorage.getItem('user-info'))) {
                this.$router.push({ name: 'Login' });
            } else {
                const user_name = JSON.parse(localStorage.getItem('user-info'))
                this.user = user_name.first_name + ' ' + user_name.last_name;
            }
        }
    },
    mounted() {
        this.checkLoginStatus();
    }
}
</script>
