<template>
<v-toolbar color="#4caf51">
    <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>
    <v-toolbar-title>
        <v-btn tile text color="white" class="mr-2" to="/"> Home </v-btn>
        <v-btn tile text color="white" class="mx-2" to="/add"> Add Student </v-btn>
        <v-btn tile text color="white" class="mx-2" @click="logout"> Logout </v-btn>
    </v-toolbar-title>
</v-toolbar>
</template>

<script>
export default {
    methods: {
        logout() {
            localStorage.clear();
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>
