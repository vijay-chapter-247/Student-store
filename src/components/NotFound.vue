<template>
<div>

    <Header></Header>

    <div class=" err d-flex justify-content-center align-items-center flex-column text-center ">
        <v-container class="success--text">
            <h2>This Page Not Available Anymore</h2>
            <h2 class="h1">404 Error</h2>
            <v-btn color="success" block outlined to="/">Go Home</v-btn>
        </v-container>
    </div>
</div>
</template>

<script>
import Header from './Header.vue'
export default {
    components: {
        Header
    }
}
</script>

<style lang="scss" scoped>
.err {
    min-height: 75vh;

    .h1 {
        font-size: 10rem;
        letter-spacing: 3px;
        margin: 20px auto;
    }
}

@media (max-width: 768px) {
    .err {
        .h1 {
            font-size: 5rem;
            letter-spacing: 1px;
            margin: 20px auto;
        }
    }
}

@media (max-width: 555px) {
    .err {
        h2 {
            font-size: 1rem;
        }

        .h1 {
            font-size: 2rem;
            letter-spacing: 0px;
            margin: 10px auto;
        }
    }
}
</style>
