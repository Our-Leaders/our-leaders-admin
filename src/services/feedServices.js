import instance from './services';

const resource = '/feeds';

export default {
  getUpdates(politicianId) {
    return instance.get(`${resource}/politician/${politicianId}`);
  },
};
