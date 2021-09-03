import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import login from './modules/login.js'
import signup from './modules/signup.js'
import add from './modules/add.js'
import update from './modules/update.js'
import remove from './modules/delete.js'
import studentsData from './modules/studentsData.js'

export default new Vuex.Store({
    modules: {
        login,
        signup,
        add,
        update,
        remove,
        studentsData
    },
})