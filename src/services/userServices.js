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
};
