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
    state.politicalPartyPagination.page = page;
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
