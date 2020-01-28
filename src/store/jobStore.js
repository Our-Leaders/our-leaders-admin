export const jobMutations = {
  setJobs(state, jobsByCategory) {
    state.jobsByCategory = { ...jobsByCategory };
  },
  newJobCategory(state, categoryName) {
    const { jobsByCategory } = state;
    state.jobsByCategory = {
      ...jobsByCategory,
      [categoryName]: [],
    };
  },
};

export const jobGetters = {
  getCategories: state => Object.keys(state.jobsByCategory),
  getCategoriesAndJobs: state => state.jobsByCategory,
};

export const jobActions = {
  storeJobs({ commit }, data) {
    const jobsByCategory = {};

    data.forEach((job) => {
      let { category = '' } = job;

      if (!category) {
        category = 'Others';
      }

      if (!jobsByCategory[category]) {
        jobsByCategory[category] = [];
      }

      jobsByCategory[category].push(job);
    });

    commit('setJobs', jobsByCategory);
  },
  newJobCategory({ commit }, categoryName) {
    commit('newJobCategory', categoryName);
  },
};
