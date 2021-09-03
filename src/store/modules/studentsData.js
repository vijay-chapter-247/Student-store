import axios from 'axios'

const state = {
    students: []
};

const mutations = {

    studentDetails: (state, students) => { state.students = students },

    newStudent: (state, student) => { state.students.push(student) },

    removeStudent: (state, deleteStudentId) => { state.students.filter(student => student.id !== deleteStudentId) },

};

const actions = {

    async studentDataList({ commit }) {
        let response = await axios.get("http://localhost:3000/Student");
        commit('studentDetails', response.data);
    },

    async addStudentData({ commit, dispatch }, payload) {
        let response = await axios.post("http://localhost:3000/Student", payload);
        commit('newStudent', response.data);

        if (response.status == 201) {
            dispatch('studentDataList');
        }
    },

    async deleteStudent({ commit, dispatch }, payload) {
        let response = await axios.delete(`http://localhost:3000/Student/${payload}`);
        commit('removeStudent', payload);

        if (response.status == 200) {
            dispatch('studentDataList');
        }
    },
};

const getters = {
    allStudents: (state) => state.students
};

export default {
    state,
    mutations,
    actions,
    getters
}