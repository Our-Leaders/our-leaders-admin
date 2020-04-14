import instance from './services';

const resource = '/jobs';

export default {
  getJobs() {
    return instance.get(`${resource}`);
  },
  createNewJob(payload) {
    return instance.post(resource, payload);
  },
  editJob(jobId, payload) {
    return instance.put(`${resource}/${jobId}`, payload);
  },
  toggleArchive(jobId, archive = false) {
    const url = `${resource}/${jobId}/${archive ? 'archive' : 'unarchive'}`;
    return instance.put(url, {});
  },
  getJobCategories() {
    return instance.get(`${resource}/categories`);
  },
};
