export const adminMutations = {
  storeAdmins(state, admins) {
    state.admins = admins;
  },
};

export const adminGetters = {
  getAdmins(state) {
    return (status = '') => {
      if (status === 'inactive') {
        return state.admins.filter(admin => admin.isDeleted);
      }

      if (status !== 'all') {
        return state.admins.filter(admin => admin.role === status);
      }

      return state.admins;
    };
  },
};
