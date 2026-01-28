import HomeView from './views/HomePage.vue';
import LoginView from './views/user/login.vue';
import UserProfilPage from './views/user/ProfilPage.vue';

import Default from '@/layouts/Default.vue';

import ArticlesPage from './views/billable/articles/ArticlesPage.vue';
import ServicesPage from './views/billable/services/ServicesPage.vue';
import ClientsPage from './views/clients/ClientsPage.vue';

import EstimatesPage from './views/documents/estimates/EstimatesPage.vue';

import EstimatePrintPage from '@/views/documents/estimates/print/EstimatePrintPage.vue';
import EstimateClientPage from './views/documents/estimates/edit/ClientPage.vue';
import EstimateInvoicePage from './views/documents/estimates/edit/InvoicePage.vue';
import EstimateItemsPage from './views/documents/estimates/edit/ItemsPage.vue';
import LayoutEdit from './views/documents/estimates/edit/LayoutEdit.vue';

import type { RouteRecordRaw } from 'vue-router';
import InvoicesPage from './views/documents/invoices/InvoicesPage.vue';
import InvoicePrintPage from './views/documents/invoices/print/InvoicePrintPage.vue';

const routes: RouteRecordRaw[] = [
    {
        path: '/documents/estimates/:id/print',
        component: EstimatePrintPage,
    },
    {
        path: '/documents/invoices/:id/print',
        component: InvoicePrintPage,
    },
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
            {
                path: '/clients',
                component: ClientsPage,
            },
            {
                path: '/articles',
                component: ArticlesPage,
            },
            {
                path: '/services',
                component: ServicesPage,
            },
            {
                path: '/documents/estimates',
                component: EstimatesPage,
            },
            {
                path: '/documents/estimates/:id',
                component: LayoutEdit,
                children: [
                    { path: 'items', component: EstimateItemsPage },
                    { path: 'client', component: EstimateClientPage },
                    { path: 'invoice', component: EstimateInvoicePage },
                ],
            },
            {
                path: '/documents/invoices',
                component: InvoicesPage,
            }
        ]
    }
];

export default routes;