import HomeView from './views/HomePage.vue';
import LoginView from '@sagace/common/views/LoginPage.vue';
import UserProfilPage from '@sagace/common/views/UserProfilPage.vue';

import Default from '@/layouts/Default.vue';


import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
    {
        path: '',
        component: Default,
        children: [
            {
                path: '',
                component: HomeView,
            },
            {
                path: '/user/profil',
                component: UserProfilPage,
            },
            {
                path: '/user/login',
                component: LoginView,
            },
        ]
    }
];

export default routes;