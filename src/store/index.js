import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersist from 'vuex-persist';

import defaultState from './defaultState';

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
  // added this to the the persist module what to persist and what not to persist, in the case
  // not to persist the notification state because it should be temprary
  reducer: state => ({
    currentUser: state.currentUser,
    jwtToken: state.jwtToken,
    politicians: state.politicians,
    activeModal: state.activeModal,
    activeModalProps: state.activeModalProps,
    politicalParties: state.politicalParties,
    statistics: state.statistics,
    admins: state.admins,
    page: {
      aboutUs: state.page.aboutUs,
      socials: {
        facebook: state.page.socials.facebook,
        twitter: state.page.socials.twitter,
        instagram: state.page.socials.instagram,
        linkedin: state.page.socials.linkedin,
      },
      contact: {
        address: state.page.contact.address,
        phoneNumber: state.page.contact.phoneNumber,
        email: state.page.contact.email,
      },
      jobsByCategory: state.jobsByCategory,
    },
    politicalPartyPagination: {
      page: state.politicalPartyPagination.page,
      numberPerPage: state.politicalPartyPagination.numberPerPage,
    },
    politicianPagination: {
      page: state.politicianPagination.page,
      numberPerPage: state.politicianPagination.numberPerPage,
    },
  }),
});

export default new Vuex.Store({
  state: defaultState,
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
