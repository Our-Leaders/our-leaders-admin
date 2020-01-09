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

Vue.use(Vuex);

const vuexPersist = new VuexPersist({
  key: 'our-leaders',
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
  ),
  actions: {},
  modules: {},
  plugins: [vuexPersist.plugin],
});
