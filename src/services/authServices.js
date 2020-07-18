import instance from './services';

const resource = '/auth';

export default {
  login(data) {
    return instance.post(`${resource}/login/admin`, data);
  },
  requestPasswordReset(data) {
    return instance.post(`${resource}/request-reset`, data);
  },
  resetPassword(data) {
    return instance.post(`${resource}/reset-password`, data);
  },
};
