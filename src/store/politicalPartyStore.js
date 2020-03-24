export const politicalPartyMutations = {
  storePoliticalParties(state, { politicalParties, politicalPartyCount }) {
    state.politicalParties = politicalParties;
    state.politicalPartyCount = politicalPartyCount;
  },
  clearPoliticalParties(state) {
    state.politicalParties = [];
    state.politicalPartyCount = 0;
  },
  changePartyPageNumber(state, page) {
    state.politicalPartyPagination.page = page;
  },
  resetPartyPagination(state) {
    state.politicalPartyPagination.page = 1;
  },
};

export const politicalPartyGetters = {
  getPoliticalParty: state => id => state.politicalParties.find(party => party.id === id),
  getPoliticalPartyPageCount: (state) => {
    const { politicalPartyCount, politicalPartyPagination } = state;
    const { numberPerPage } = politicalPartyPagination;
    return Math.ceil(politicalPartyCount / numberPerPage);
  },
};
