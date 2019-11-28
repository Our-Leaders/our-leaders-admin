export const authMutations = {
  setJWT(state, jwt) {
    state.jwtToken = jwt;
  },
};

export const authGetters = {
  jwt: state => state.jwtToken,
};
