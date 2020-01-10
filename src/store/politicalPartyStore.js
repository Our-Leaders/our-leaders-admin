export const politicalPartyMutations = {
  storePoliticalParties(state, politicalParties) {
    state.politicalParties = politicalParties;
  },
};

export const politicalPartyGetters = {
  politicalPartyCount: state => state.politicalParties.length,
  getPoliticalParty: state => id => state.politicalParties.find(party => party.id === id),
};
