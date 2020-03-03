import instance from './services';

const resource = '/admins';

export default {
  getAdmins() {
    return instance.get(resource);
  },
  addNewAdmin(payload) {
    return instance.post(resource, payload);
  },
  updateAdminStatus(id, payload) {
    return instance.put(`${resource}/${id}/status`, payload);
  },
};
