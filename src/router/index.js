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
      if (store.getters.isLoggedIn) {
        next();
      } else {
        next({ name: 'sign-in' });
      }
    },
  },
  {
    path: '/auth/sign-in',
    name: 'sign-in',
    component: Pages.SignIn,
    beforeEnter: (to, from, next) => {
      if (store.getters.isLoggedIn) {
        next({ name: 'home' });
      } else {
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
