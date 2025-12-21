import HomeView from './views/home.vue';
import LoginView from './views/user/login.vue';

import ClientsList from './views/clients/list.vue';
import ArticlesList from './views/articles/list.vue';
import ServicesList from './views/services/list.vue';

import EstimatesList from './views/estimates/list.vue';
import EstimatesNew from './views/estimates/new.vue';

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
        component: ClientsList,
    },
    {
        path: '/articles',
        component: ArticlesList,
    },
    {
        path: '/services',
        component: ServicesList,
    },
    {
        path: '/estimates',
        component: EstimatesList,
    },
    {
        path: '/estimates/new',
        component: EstimatesNew,
    },
];