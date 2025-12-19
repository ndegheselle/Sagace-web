import AboutView from '@/views/AboutView.vue';
import HomeView from '@/views/HomeView.vue';

export default [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
];