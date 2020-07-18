export const adminMutations = {
  storeAdmins(state, admins) {
    state.admins = admins;
  },
  clearAdmins(state) {
    state.admins = [];
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
  totalAdminCount(state) { return state.admins.length; },
  activeAdminCount(state) {
    return state.admins.filter(admin => !admin.isDeleted).length;
  },
  inactiveAdminCount(state) {
    return state.admins.filter(admin => admin.isDeleted).length;
  },
  getAdmin(state) {
    return id => state.admins.find(admin => admin.id === id);
  },
};
