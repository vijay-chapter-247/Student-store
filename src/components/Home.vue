<template>
<div>
    <Header />
    <h1 class="text-center my-8 success--text">Hello {{ `${user.toUpperCase()}` }}, Welcome on Home page.</h1>
    <v-data-table :headers="headers" :items="allStudents" :items-per-page="5" class="elevation-5 success--text font-weight-bold">
        <template v-slot:item.action="{item}">
            <v-btn icon outlined color="success" :to="`update/${item.id}`">
                <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <span class="mx-1"></span>
            <v-btn icon outlined color="success" @click="deleteStudent(item.id)">
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </template>
        <template v-slot:item.image="{item}">
            <v-avatar size="40" tile color="success" class="my-sm-3">
                <v-icon dark>
                    mdi-account-circle
                </v-icon>
            </v-avatar>
        </template>
    </v-data-table>
</div>
</template>

<script>
import axios from 'axios'
import Header from './Header.vue'
import { mapActions, mapGetters } from 'vuex';

export default {
    components: {
        Header
    },
    data() {
        return {
            user: '',
            headers: [{
                    text: 'Id',
                    align: 'center',
                    sortable: false,
                    value: 'id',
                },
                {
                    text: 'User',
                    // align: 'center',
                    sortable: false,
                    value: 'image',
                },
                {
                    text: 'Name',
                    sortable: false,
                    value: 'name'
                },
                {
                    text: 'Address',
                    sortable: false,
                    value: 'address'
                },
                {
                    text: 'Contact',
                    sortable: false,
                    align: 'center',
                    value: 'contact'
                },
                {
                    text: 'Actions',
                    sortable: false,
                    align: 'center',
                    value: 'action'
                },
            ],
        }
    },

    computed: {
        ...mapGetters(['allStudents'])
    },

    methods: {
        ...mapActions(['studentDataList', 'deleteStudent']),

        updateStudent(id) {
            console.warn(id);
        },

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
    },
    created() {
        this.studentDataList();
    }
}
</script>
