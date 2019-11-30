import Vue from 'vue';
import VueRouter from 'vue-router';

import Pages from '../views/index';
import Components from '../components';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      nav: Components.Navigation,
      default: Pages.Home,
    },
  },
  {
    path: '/auth/sign-in',
    name: 'sign-in',
    component: Pages.SignIn,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
