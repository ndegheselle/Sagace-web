import HomeView from './views/home.vue';
import LoginView from './views/user/login.vue';

import ArticlesPage from './views/billable/articles/ArticlesPage.vue';
import ServicesPage from './views/billable/services/ServicesPage.vue';
import ClientsPage from './views/clients/ClientsPage.vue';

import EstimatesPage from './views/estimates/EstimatesPage.vue';
import EstimateClientSelectionPage from './views/estimates/new/ClientSelectionPage.vue';
import EstimateInvoiceStatusPage from './views/estimates/new/InvoiceStatusPage.vue';
import EstimateServiceListPage from './views/estimates/new/ServiceListPage.vue';

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
        path: '/estimates/new',
        children: [
            { path: 'client', component: EstimateClientSelectionPage },
            { path: 'services', component: EstimateServiceListPage },
            { path: 'invoice', component: EstimateInvoiceStatusPage },
        ],
    },
];