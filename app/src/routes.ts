import HomeView from './views/home.vue';
import LoginView from './views/user/login.vue';

import ClientsList from './views/clients/list.vue';
import Clientsnew from './views/clients/new.vue';

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
        path: '/clients/new',
        component: Clientsnew,
    }
];