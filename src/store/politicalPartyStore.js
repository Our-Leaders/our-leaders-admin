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
  editPoliticalParty(state, { partyData }) {
    const parties = state.politicalParties.map((party) => {
      if (party.id === partyData.id) {
        return {
          ...partyData,
        };
      }

      return party;
    });

    state.politicalParties = [...parties];
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
