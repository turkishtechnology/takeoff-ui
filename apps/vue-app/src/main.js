import './assets/main.css';
import '@takeoff-ui/core/dist/core/core.css';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

const app = createApp(App);
app.use(router);
app.mount('#app');
