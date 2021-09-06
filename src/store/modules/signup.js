import axios from 'axios'
import router from '@/router'

const state = {};
const mutations = {};
const actions = {
    async signup({commit}, payload){
        const response = await axios.post("http://localhost:3000/users", payload);
        if (response.status == 201) {
            localStorage.setItem("user-info", JSON.stringify(response.data));
            router.push({ name: 'Home' });
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}