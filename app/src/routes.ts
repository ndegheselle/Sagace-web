import HomeView from './views/home.vue';
import LoginView from './views/user/login.vue';

import ArticlesPage from './views/billable/articles/ArticlesPage.vue';
import ServicesPage from './views/billable/services/ServicesPage.vue';
import ClientsPage from './views/clients/ClientsPage.vue';

import EstimatesPage from './views/estimates/EstimatesPage.vue';
import LayoutEdit from './views/estimates/edit/LayoutEdit.vue';
import EstimateClientPage from './views/estimates/edit/ClientPage.vue';
import EstimateInvoicePage from './views/estimates/edit/InvoicePage.vue';
import EstimateItemsPage from './views/estimates/edit/ItemsPage.vue';

export default [
    {
        path: '/',
        component: HomeView,
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
        path: '/estimates',
        component: EstimatesPage,
    },
    {
        path: '/estimates/:id',
        component: LayoutEdit,
        children: [
            { path: 'items', component: EstimateItemsPage },
            { path: 'client', component: EstimateClientPage },
            { path: 'invoice', component: EstimateInvoicePage },
        ],
    },
];