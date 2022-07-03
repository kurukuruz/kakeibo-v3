import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia';
import router from './plugins/use-router';
import App from './App.vue';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@mdi/font/css/materialdesignicons.css';
import './plugins/use-firebase';

createApp(App)
  .use(PrimeVue)
  .use(ConfirmationService)
  .use(ToastService)
  .use(createPinia())
  .use(router)
  .mount('#app');
