import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import { authGetters, authMutations } from './authStore';
import { userGetters, userMutations } from './userStore';
import { politicianGetters, politicianMutations } from './politicianStore';
import { statisticGetters, statisticMutations } from './statisticsStore';
import { modalGetters, modalMutations } from './modalStore';
import { politicalPartyGetters, politicalPartyMutations } from './politicalPartyStore';
import { adminGetters, adminMutations } from './adminStore';
import { notificationActions, notificationMutations } from './notificationStore';
import { pagesGetters, pagesMutations } from './pagesStore';
import { jobGetters, jobMutations, jobActions } from './jobStore';

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'our-leaders-admin',
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    currentUser: null,
    jwtToken: '',
    politicians: [],
    activeModal: null,
    activeModalProps: {},
    politicalParties: [],
    statistics: {},
    admins: [],
    info: {
      header: null,
      details: null,
      display: false,
      type: 'info',
    },
    page: {
      aboutUs: '',
      socials: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
      },
      contact: {
        address: '',
        phoneNumber: '',
        email: '',
      },
    },
    // stored as { category: Array<job> }
    jobsByCategory: {},
  },
  getters: Object.assign(
    {},
    authGetters,
    adminGetters,
    userGetters,
    politicianGetters,
    modalGetters,
    politicalPartyGetters,
    statisticGetters,
    pagesGetters,
    jobGetters,
  ),
  mutations: Object.assign(
    {},
    authMutations,
    adminMutations,
    userMutations,
    politicianMutations,
    modalMutations,
    politicalPartyMutations,
    statisticMutations,
    notificationMutations,
    pagesMutations,
    jobMutations,
  ),
  actions: Object.assign({}, notificationActions, jobActions),
  modules: {},
  plugins: [vuexPersist.plugin],
});
