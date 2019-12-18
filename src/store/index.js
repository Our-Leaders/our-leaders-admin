import Vue from 'vue';
import Vuex from 'vuex';

import { authGetters, authMutations } from './authStore';
import { userGetters, userMutations } from './userStore';
import { politicianGetters, politicianMutations } from './politicianStore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    jwtToken: '',
    politicians: [],
  },
  getters: Object.assign({}, authGetters, userGetters, politicianGetters),
  mutations: Object.assign({}, authMutations, userMutations, politicianMutations),
  actions: {
  },
  modules: {
  },
});
