import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Signup from '../components/Signup.vue'
import Login from '../components/Login.vue'
import Add from '../components/Add.vue'
import Update from '../components/Update.vue'
import UpdateAll from '../components/UpdateAll.vue'
import StudentInfo from '../components/StudentInfo.vue'
import NotFound from '../components/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'Add',
    component: Add
  },
  {
    path: '/student-info',
    name: 'StudentInfo',
    component: StudentInfo
  },
  {
    path: '/update/:id',
    name: 'Update',
    component: Update
  },
  {
    path: '/update-student/:id',
    name: 'UpdateAll',
    component: UpdateAll
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
