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
  ),
  actions: Object.assign({}, notificationActions),
  modules: {},
  plugins: [vuexPersist.plugin],
});
