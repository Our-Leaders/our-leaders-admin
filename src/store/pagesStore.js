export const pagesMutations = {
  setPage(state, pages) {
    state.page = pages;
  },
  updateAboutUs(state, aboutUs) {
    state.page = { ...state.page, aboutUs };
  },
  clearPage(state) {
    state.page = {
      aboutUs: '',
      socials: {
        facebook: '',
        twitter: '',
        instagram: '',
        linkedin: '',
      },
      contact: {
        address: '',
        phoneNumber: '',
        email: '',
      },
    };
  },
};

export const pagesGetters = {
  getPage: state => () => Object.assign({}, state.page),
};
