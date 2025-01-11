import { createApp } from 'vue';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';
import { createPinia } from 'pinia';
import router from './plugins/use-router';
import App from './App.vue';
import './index.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import '@mdi/font/css/materialdesignicons.css';
import './assets/styles/global.scss';
import './plugins/use-firebase';

createApp(App)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        darkModeSelector: false,
      },
    },
  })
  .use(ConfirmationService)
  .use(ToastService)
  .use(createPinia())
  .use(router)
  .mount('#app');
