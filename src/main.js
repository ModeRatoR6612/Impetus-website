import { createApp } from 'vue';
import App from './App.vue'
import router from './router.js';
import axios from 'axios';
import { createHead } from '@vueuse/head';
axios.defaults.baseURL = 'http://localhost:3000';

const head = createHead();
const app = createApp(App)
app.use(router, head);
app.mount('#app');