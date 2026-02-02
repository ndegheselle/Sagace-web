import type { RouteRecordRaw } from 'vue-router';
import Default from '@/layouts/Default.vue';

import HomePage from '@/views/HomePage.vue';
import UserProfilPage from '@common/views/UserProfilPage.vue';
import LoginPage from '@common/views/LoginPage.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '',
        component: Default,
        children: [
            {
                path: '',
                component: HomePage,
            },
            {
                path: '/user/profil',
                component: UserProfilPage,
            },
            {
                path: '/user/login',
                component: LoginPage,
            },
        ]
    }
];

export default routes;