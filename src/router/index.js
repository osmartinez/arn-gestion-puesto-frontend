import Vue from 'vue'
import Router from 'vue-router'
import AppLayout from '../components/layouts/AppLayout.vue'

Vue.use(Router)



const demoRoutes = []

export default new Router({
    mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
    routes: [
        ...demoRoutes,
        {
            path: '*',
            redirect: { name: 'home' },
        },
        {
            path: '/',
            component: AppLayout,
            children: [
                {
                    name: 'home',
                    path: 'home',
                    component: () => import('../components/home/Home.vue'),
                },
                {
                    name: 'user',
                    path: 'user',
                    component: () => import('../components/user/Login.vue'),
                },
                {
                    name: 'task',
                    path: 'task',
                    component: () => import('../components/task/Main.vue'),

                },
                {
                    name: 'configuration',
                    path: 'configuration',
                    component: ()=> import('../components/configuration/Main.vue')
                },
                {
                    name: 'machine',
                    path: 'machine',
                    component: ()=> import('../components/machine/Main.vue')
                },
                {
                    path: '',
                    redirect: { name: 'home' },
                },
            ],
        },
    ]
})