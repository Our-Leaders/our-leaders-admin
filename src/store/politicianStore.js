export const politicianMutations = {
  storePoliticians(state, politicians) {
    state.politicians = politicians;
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
};

export const politicianGetters = {
  getPoliticians(state) {
    return (status = 'current') => state.politicians.filter(politician => politician.status === status);
  },
  politicianCount: state => state.politicians.length,
  getPolitician(state) {
    return id => state.politicians.find(politician => politician.id === id);
  },
};
