export const pagesMutations = {
  setPage(state, pages) {
    state.page = pages;
  },
  updateAboutUs(state, aboutUs) {
    state.page = { ...state.page, aboutUs };
  },
};

export const pagesGetters = {

};
