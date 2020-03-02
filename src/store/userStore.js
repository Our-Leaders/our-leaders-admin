export const userMutations = {
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
  clearUser(state) {
    state.currentUser = null;
  },
};

export const userGetters = {
  user: state => state.currentUser,
};
