import instance from './services';
import StringUtil from '../helpers/stringUtil';

const resource = '/admins';

export default {
  getAdmins(filter) {
    return instance.get(StringUtil.generateUrl(resource, filter));
  },
  addNewAdmin(payload) {
    return instance.post(resource, payload);
  },
  editAdmin(adminId, payload) {
    return instance.put(`${resource}/${adminId}`, payload);
  },
  reactivateAdmin(adminId) {
    return instance.post(`${resource}/${adminId}`);
  },
  updateAdminStatus(id, payload) {
    return instance.put(`${resource}/${id}/status`, payload);
  },
  deleteAdmin(id) {
    return instance.delete(`${resource}/${id}`);
  },
};
