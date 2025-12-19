import './assets/main.css';

import { createApp } from 'vue';
import { createMemoryHistory, createRouter } from 'vue-router';
import App from './App.vue';
import routes from './routes.js';

const app = createApp(App);

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

app.use(router);
app.mount('#app');