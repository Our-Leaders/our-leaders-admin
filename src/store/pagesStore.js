export const pagesMutations = {
  storePages(state, pages) {
    state.pages = pages;
  },
};

export const pagesGetters = {
  getPages(state) {
    return () => state.pages;
  },
};
