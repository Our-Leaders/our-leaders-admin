import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import state from './defaultState';

import { authGetters, authMutations, authActions } from './authStore';
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
  state,
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
  actions: Object.assign({}, notificationActions, jobActions, authActions),
  modules: {},
  plugins: [vuexPersist.plugin],
});
