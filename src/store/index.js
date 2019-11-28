import Vue from 'vue';
import Vuex from 'vuex';

import { authGetters, authMutations } from './authStore';
import { userGetters, userMutations } from './userStore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    jwtToken: '',
  },
  getters: Object.assign({}, authGetters, userGetters),
  mutations: Object.assign({}, authMutations, userMutations),
  actions: {
  },
  modules: {
  },
});
