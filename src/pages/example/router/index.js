import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/home/Home'

Vue.use(Router)

const router = new Router({
    linkActiveClass: 'active',
    routes: [{
        path: '/home',
        name: 'home',
        component: Home,
    }]

})

export default router
