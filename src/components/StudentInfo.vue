<template>
<div>
    <Header />
    <h1 class="text-center my-8 success--text">Hello Welcome on All Student Details page.</h1>
    <v-container>

        <v-row>
            <!-- <v-row justify="center" class="text-h6">
            <p text dense v-if="loading" class="mt-15">Loading...</p>
            <p v-else-if="!loading && (!team || team.length === 0)" class="mt-15">
                No team found.
            </p>
        </v-row> -->
            <v-col cols="12" sm="6" md="4" v-for="member in team" :key="member.name">
                <v-card flat dark class="text-center rounded border pa-3" outlined elevation="10" :class="member.color">
                    <v-responssive name="1">
                        <v-avatar size="100">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" class="success lighten-4" />
                        </v-avatar>
                    </v-responssive>

                    <v-card-text>
                        <div class="text-h6 white--text">{{ member.developer }}</div>
                        <div class="body-1 white--text">{{ member.name }}</div>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn text>
                            <v-icon left>mdi-message-flash-outline</v-icon>
                            <span>Message</span>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</div>
</template>

<script>
import Header from './Header.vue'

export default {
    components: {
        Header
    },
    data() {
        return {
            team: [{
                    id: "1",
                    name: "Vijay Vishwakarma",
                    color: "success",
                    developer: "Web Developer",

                },
                {
                    id: "1",
                    name: "Vijay Vishwakarma",
                    color: "success",
                    developer: "Web Developer",

                },
                {
                    id: "1",
                    name: "Vijay Vishwakarma",
                    color: "success",
                    developer: "Web Developer",

                },
                {
                    id: "1",
                    name: "Vijay Vishwakarma",
                    color: "success",
                    developer: "Web Developer",

                }
            ]
        }
    },
}
</script>

<style>

</style>
