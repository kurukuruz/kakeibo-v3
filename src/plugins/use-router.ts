import { createRouter, createWebHashHistory } from 'vue-router';
import TheHomePage from '../pages/TheHomePage.vue';
import TheMainPage from '../pages/TheMainPage.vue';

const routes = [
  { path: '/', component: TheHomePage },
  { path: '/main', component: TheMainPage },
];

const router = createRouter({
  // 4. Provide the history implementation to use.
  //    We are using the hash history for simplicity here.
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
});

export default router;
