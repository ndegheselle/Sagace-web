import Default from '@/layouts/Default.vue';
import type { RouteRecordRaw } from 'vue-router';

import HomePage from '@/views/HomePage.vue';
import LoginPage from '@common/views/LoginPage.vue';
import UserProfilPage from '@common/views/UserProfilPage.vue';

import ClientsPage from '@features/invoicing/views/clients/ClientsPage.vue';
import EstimatesPage from '@features/invoicing/views/estimates/EstimatesPage.vue';
import LayoutEdit from '@features/invoicing/views/estimates/edit/LayoutEdit.vue';

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
            {
                path: '/invoicing/clients',
                component: ClientsPage,
            },
            {
                path: '/invoicing/estimates',
                component: EstimatesPage,
            },
            
            {
                path: '/invoicing/estimates/:id',
                component: LayoutEdit,
            },
        ]
    }
];

export default routes;