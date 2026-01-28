import './style.css';

import { useAuth } from '@/composables/auth';
import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import routes from './routes';

export const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to) => {
    if (to.path === '/user/login')
        return;

    const auth = useAuth();
    if (!auth.isLoggedIn.value && !await auth.refresh())
    {
        return { path: '/user/login' };
    }
})

createApp(App).use(router).mount('#app');

// Handle details auto close
document.addEventListener('click', (e: MouseEvent) => {
    const target = e.target;
    const details = [...document.querySelectorAll('details')];

    if (!(target instanceof Node)) {
        return;
    }

    if (!details.some(f => f.contains(target))) {
        details.forEach(f => f.removeAttribute('open'));
    } else {
        details.forEach(f => {
            if (!f.contains(target)) {
                f.removeAttribute('open');
            }
        });
    }
});