import instance from './services';

const resource = '/auth';

export default {
  login(data) {
    return instance.post(`${resource}/login`, data);
  },
};
