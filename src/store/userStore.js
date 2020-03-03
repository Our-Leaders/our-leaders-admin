export const userMutations = {
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
  clearCurrentUser(state) {
    state.currentUser = null;
  },
};

export const userGetters = {
  user: state => state.currentUser,
};
