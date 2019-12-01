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
