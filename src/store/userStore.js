export const userMutations = {
  setCurrentUser(state, user) {
    state.currentUser = user;
  },
};

export const userGetters = {
  user: state => state.currentUser,
};
