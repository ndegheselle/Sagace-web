import Default from '@/layouts/Default.vue';
import type { RouteRecordRaw } from 'vue-router';

import HomePage from '@/views/HomePage.vue';
import LoginPage from '@common/views/LoginPage.vue';
import UserProfilPage from '@common/views/UserProfilPage.vue';

import ClientsPage from '@features/invoicing/views/clients/ClientsPage.vue';
import EstimatesPage from '@features/invoicing/views/estimates/EstimatesPage.vue';
import EstimateEditPage from '@features/invoicing/views/estimates/EstimateEditPage.vue';
import EstimatePrintPage from '@features/invoicing/views/estimates/print/EstimatePrintPage.vue';

import InvoicesPage from '@features/invoicing/views/invoices/InvoicesPage.vue';
import InvoicePrintPage from '@features/invoicing/views/invoices/print/InvoicePrintPage.vue';

import ArticlesPage from '@features/stock/views/articles/ArticlesPage.vue';
import ServicesPage from '@features/stock/views/services/ServicesPage.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/invoicing/estimates/:id/print',
        component: EstimatePrintPage,
    },
    {
        path: '/invoicing/invoices/:id/print',
        component: InvoicePrintPage,
    },
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
                component: EstimateEditPage,
            },
            {
                path: '/invoicing/invoices',
                component: InvoicesPage,
            },

            {
                path: '/stock/articles',
                component: ArticlesPage,
            },
            {
                path: '/stock/services',
                component: ServicesPage,
            },
        ]
    }
];

export default routes;