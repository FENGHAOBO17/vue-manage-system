import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import( '../views/Register.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import( '../views/Home.vue')
  },
  {
    path: '/detils',
    name: 'Detils',
    component: () => import( '../views/Detils.vue'),
  },
]

const router = new VueRouter({
  routes
})

export default router
