export const authMutations = {
  setJWT(state, jwt) {
    state.jwtToken = jwt;
  },
  clearJWT(state) {
    state.jwtToken = null;
  },
};

export const authGetters = {
  isLoggedIn: state => !!state.jwtToken,
  jwt: state => state.jwtToken,
};

export const authActions = {
  signout({ commit }) {
    commit('clearJWT');
    commit('clearUser');
    commit('clearJobCategory');
    commit('closeModal');
    // commit('hideMessage');
    commit('clearPoliticalParties');
    commit('clearStatistics');
    commit('clearPoliticians');
    commit('clearPage');
    commit('clearAdmins');
  },
};
