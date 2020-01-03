import instance from './services';

const resource = '/statistics';

export default {
  getStats() {
    return instance.get(resource);
  },
};
