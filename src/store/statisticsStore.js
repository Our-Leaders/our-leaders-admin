export const statisticMutations = {
  storeStatistics(state, statistics) {
    state.statistics = statistics;
  },
};

export const statisticGetters = {
  getStatistics(state) {
    return () => state.statistics;
  },
};
