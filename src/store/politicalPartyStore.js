export const politicalPartyMutations = {
  storePoliticalParties(state, { politicalParties, politicalPartyCount }) {
    state.politicalParties = politicalParties;
    state.politicalPartyCount = politicalPartyCount;
  },
  clearPoliticalParties(state) {
    state.politicalParties = [];
    state.politicalPartyCount = 0;
  },
};

export const politicalPartyGetters = {
  getPoliticalParty: state => id => state.politicalParties.find(party => party.id === id),
};
