import axios from 'axios'
import router from '@/router'

const state = {};
const mutations = {};
const actions = {
    async updateStudent({ commit }, payload) {
        let response = await axios.put(`http://localhost:3000/Student/${router.currentRoute.params.id}`, payload);

        if (response.status == 200) {
            router.push({ name: 'Home' });
        }
    },
    async updateAllStudent({ commit }, payload) {
        let response = await axios.put(`http://localhost:3000/Student/${router.currentRoute.params.id}`, payload);

        if (response.status == 200) {
            router.push({ name: 'StudentInfo' });
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