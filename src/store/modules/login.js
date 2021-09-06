import axios from 'axios'
import router from '@/router'

const state = {};
const mutations = {};
const actions = {
    async login({commit}, payload) {
        const response = await axios.get(`http://localhost:3000/users?email=${payload.email}&password=${payload.password}`);


        if (response.status == 200 && response.data.length > 0) {
            localStorage.setItem('user-info', JSON.stringify(response.data[0]));
            router.push({ name: 'Home' })
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