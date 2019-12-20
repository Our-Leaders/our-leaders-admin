import Vue from 'vue';
import Vuex from 'vuex';

import { authGetters, authMutations } from './authStore';
import { userGetters, userMutations } from './userStore';
import { politicianGetters, politicianMutations } from './politicianStore';
import { modalGetters, modalMutations } from './modalStore';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentUser: null,
    jwtToken: '',
    politicians: [],
    activeModal: null,
  },
  getters: Object.assign({}, authGetters, userGetters, politicianGetters, modalGetters),
  mutations: Object.assign({}, authMutations, userMutations, politicianMutations, modalMutations),
  actions: {
  },
  modules: {
  },
});
