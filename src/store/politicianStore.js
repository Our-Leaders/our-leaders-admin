export const politicianMutations = {
  storePoliticians(state, { politicians, politicianCount }) {
    state.politicians = politicians;
    state.politicianCount = politicianCount;
  },
  storePolitician(state, { politicianId, payload }) {
    const modifiedPoliticians = state.politicians.map((politician) => {
      if (politician.id === politicianId) {
        return payload;
      }

      return politician;
    });

    state.politicians = modifiedPoliticians;
  },
  clearPoliticians(state) {
    state.politicians = [];
  },
  changePoliticianPageNumber(state, page) {
    state.politicianPagination.page = page;
  },
  resetPoliticiansPageNumber(state) {
    state.politicianPagination.page = 1;
  },
  editPolitician(state, { politicianData }) {
    const politicians = state.politicians.map((politician) => {
      if (politician.id === politicianData.id) {
        return {
          ...politicianData,
        };
      }

      return politician;
    });

    state.politicians = [...politicians];
  },
  deletePolitician(state, { politicianData }) {
    const politicians = state.politicians.filter(politician => politician.id !== politicianData.id);
    state.politicians = [...politicians];
    state.politicianCount -= 1;
  },
};

export const politicianGetters = {
  getPoliticians(state) {
    return (status = 'current') => state.politicians.filter(politician => politician.status === status);
  },
  politicianCount: state => state.politicians.length,
  getPolitician(state) {
    return id => state.politicians.find(politician => politician.id === id);
  },
  getPoliticianPageCount: (state) => {
    const { politicianCount, politicianPagination } = state;
    const { numberPerPage } = politicianPagination;
    return Math.ceil(politicianCount / numberPerPage);
  },
};
