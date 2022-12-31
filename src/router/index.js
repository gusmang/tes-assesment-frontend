import Vue from "vue";
//import VueRouter from "vue-router";
import VueRouter  from 'vue-router'
//import createWebHashHistory  from 'vue-router'

import Login from '../views/Login.vue'
import TesInput from '../views/Tesinput.vue'
import Dashboard from '../views/Templates.vue'
import Profiles from '../views/pages/profiles/detail/form.vue'

import Instruktur from '../views/pages/instruktur/detail/form.vue'
import Password from '../views/pages/password/detail/form.vue'

import MainLayout from '../views/Main.vue'
import memberRoute from "./member/memberRoute";

import KursusSaya from '../views/pages/kursus/mainKursus.vue'

if (!window.VueRouter) Vue.use(VueRouter)

const routes = [
    ...memberRoute,
    //Login
    {
        path: '/',
        name: 'Login Admin',
        component: Login
    },
    {
        path: '/acceso',
        name: 'acceso',
        component: TesInput
    },
    {
        path: '/profiles',
        name: 'Tes Input',
        component: Dashboard
    },
    {
        path: '/dashboard-new',
        name: 'Dashboard Admin',
        component: Dashboard
    },
    {
        path: '/dashboard',
        name: 'Main',
        component: MainLayout,
        children: [
            {
                path: '/dashboard/profile',
                name: 'Profile_Dash',
                component: Profiles
            },
            {
                path: '/dashboard/add-instruktur',
                name: 'Profile_Add_Instruktur',
                component: Instruktur
            },
            {
                path: '/dashboard/ganti-password',
                name: 'Profile_Ganti_Password',
                component: Password
            },
            {
                path: '/dashboard/kursus-saya-ikuti',
                name: 'Profile_Saya_Ikuti',
                component: KursusSaya
            }
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