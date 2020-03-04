import instance from './services';

const resource = '/users';

export default {
  editSelf(userId, payload) {
    return instance.put(`${resource}/${userId}`, payload);
  },
};
