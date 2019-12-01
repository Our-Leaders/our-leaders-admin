import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store';
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
    beforeEnter: (to, from, next) => {
      console.log(store.state.jwtToken, '1');
      if (store.state.jwtToken) {
        // user is logged in
        next();
      } else {
        // user isn't logged in
        next({ name: 'sign-in' });
      }
    },
  },
  {
    path: '/auth/sign-in',
    name: 'sign-in',
    component: Pages.SignIn,
    beforeEnter: (to, from, next) => {
      if (store.state.jwtToken) {
        // user is logged in
        next({ name: 'home' });
      } else {
        // user isn't logged in
        next();
      }
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
