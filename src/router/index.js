import Vue from "vue";
//import VueRouter from "vue-router";
import VueRouter  from 'vue-router'
//import createWebHashHistory  from 'vue-router'

import MainLayout from '../views/Main.vue'
import MemberList from '../views/pages/member/mainList.vue'

if (!window.VueRouter) Vue.use(VueRouter)

const routes = [
    //Login
    {
        path: '/',
        name: 'Main',
        component: MainLayout,
        children: [
            {
                path: '/',
                name: 'Main Dashboard',
                component: MemberList
            },
        ]
    }
]

const router = new VueRouter({
    //mode: createWebHashHistory(process.env.API_URL_LOCAL),
    //mode: "hash",
    mode: "hash",
    routes
});

export default router