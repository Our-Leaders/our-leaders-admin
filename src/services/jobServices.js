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
};
