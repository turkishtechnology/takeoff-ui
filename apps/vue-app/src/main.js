import './assets/main.css';
import '@takeoff-ui/core/dist/core/core.css';
import { createApp } from 'vue';
import App from './App.vue';
import { ComponentLibrary } from '@takeoff-ui/vue';

createApp(App).use(ComponentLibrary).mount('#app');
