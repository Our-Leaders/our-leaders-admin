export const statisticMutations = {
  storeStatistics(state, statistics) {
    state.statistics = {
      ...state.statistics,
      ...statistics,
    };
  },
  clearStatistics(state) {
    state.statistics = {};
  },
};

export const statisticGetters = {
  getStatistics(state) {
    return () => state.statistics;
  },
};
