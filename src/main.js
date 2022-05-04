import {createApp} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import setupInterceptors from './services/setupInterceptors';

import "bootstrap-icons/font/bootstrap-icons.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/saga-blue/theme.css  '     
import 'primevue/resources/primevue.min.css  '               
import 'primeicons/primeicons.css  '
import 'sweetalert2/dist/sweetalert2.min.css';
import './main.scss'
setupInterceptors(store);

createApp(App).use(PrimeVue).use(router).use(store).mount("#app");
