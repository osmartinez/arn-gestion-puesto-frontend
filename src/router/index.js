import Vue from 'vue'
import Router from 'vue-router'
import AppLayout from '../components/layouts/AppLayout.vue'
import TaskLayout from '../components/task/Task.vue'

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
                    component: TaskLayout,
                    children:[
                        {
                            path: 'progress',
                            name: 'progress',
                            component: ()=> import('../components/task/TaskProgress.vue'),
                            meta:{
                                title:'Tarea'
                            },
                        },
                        {
                            path: 'stats',
                            name: 'stats',
                            component: ()=> import('../components/task/TaskStatistics.vue'),
                            meta:{
                                title:'Estadisticas'
                            },
                        },
                    ]
                },
                {
                    path: '',
                    redirect: { name: 'home' },
                },
            ],
        },
    ]
})