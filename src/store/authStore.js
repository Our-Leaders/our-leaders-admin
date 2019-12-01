export const authMutations = {
  setJWT(state, jwt) {
    state.jwtToken = jwt;
  },
};

export const authGetters = {
  isLoggedIn: state => state.jwtToken !== null,
  jwt: state => state.jwtToken,
};
