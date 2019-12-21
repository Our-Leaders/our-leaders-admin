import Vue from 'vue';
import Vuex from 'vuex';

import { authGetters, authMutations } from './authStore';
import { userGetters, userMutations } from './userStore';
import { politicianGetters, politicianMutations } from './politicianStore';
import { modalGetters, modalMutations } from './modalStore';
import { politicalPartyGetters, politicalPartyMutations } from './politicalPartyStore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    jwtToken: '',
    politicians: [],
    activeModal: null,
    politicalParties: [],
  },
  getters: Object.assign(
    {},
    authGetters,
    userGetters,
    politicianGetters,
    modalGetters,
    politicalPartyGetters,
  ),
  mutations: Object.assign(
    {},
    authMutations,
    userMutations,
    politicianMutations,
    modalMutations,
    politicalPartyMutations,
  ),
  actions: {
  },
  modules: {
  },
});
