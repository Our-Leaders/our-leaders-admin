import instance from './services';
import StringUtil from '../helpers/stringUtil';

const resource = '/users';

export default {
  editSelf(userId, payload) {
    return instance.put(`${resource}/${userId}`, payload);
  },
  getUsers(filter) {
    return instance.get(StringUtil.generateUrl(resource, filter));
  },
  getUserStat() {
    return instance.get(`${resource}/stats`);
  },
  updateUserBlockStatus(id, status) {
    return instance.put(`${resource}/${id}/${status ? 'block' : 'unblock'}`);
  },
  deleteUser(id) {
    return instance.delete(`${resource}/${id}`);
  },
};
