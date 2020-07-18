import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store';
import Pages from '../views/index';
import Components from '../components';

Vue.use(VueRouter);


const routes = [
  {
    path: '/',
    components: {
      nav: Components.Navigation,
      default: Pages.Home,
    },
    children: [
      {
        path: '',
        redirect: 'home',
      },
      {
        name: 'home',
        path: 'home',
        component: Pages.AdminHome,
      },
      {
        name: 'leaders',
        path: 'leaders',
        component: Pages.Leaders,
      },
      {
        name: 'leaders-details',
        path: 'leaders/:id',
        component: Pages.LeaderDetails,
      },
      {
        name: 'web-pages',
        path: 'web-pages',
        component: Pages.WebPages,
      },
      {
        name: 'parties',
        path: 'parties',
        component: Pages.Parties,
      },
      {
        name: 'party-details',
        path: 'parties/:id',
        component: Pages.PartyDetails,
      },
      {
        name: 'admins',
        path: 'admins',
        component: Pages.Admin,
      },
      {
        name: 'archive',
        path: 'archive',
        component: Pages.Archive,
      },
      {
        name: 'profile',
        path: 'profile',
        component: Pages.Profile,
      },
      {
        path: 'analytics',
        component: Pages.Analytics,
        children: [
          {
            path: '/',
            name: 'analytics-home',
            component: Pages.AnalyticsHome,
          },
          {
            path: 'traffic',
            name: 'analytics-traffic',
            component: Pages.AnalyticsTraffic,
          },
          {
            path: 'signups',
            name: 'analytics-signups',
            component: Pages.AnalyticsSignups,
          },
          {
            path: 'donations',
            name: 'analytics-donations',
            component: Pages.AnalyticsDonations,
          },
        ],
      },
    ],
    beforeEnter: (to, from, next) => {
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
