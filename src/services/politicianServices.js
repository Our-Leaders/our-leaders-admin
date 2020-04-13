import instance from './services';

const resource = '/politicians';

export default {
  getPoliticians(filter = {}) {
    const queryString = Object.keys(filter).map(key => `${key}=${filter[key]}`).join('&');
    let url = `${resource}`;

    if (queryString) {
      url = `${url}?${queryString}`;
    }
    return instance.get(url);
  },
  createNewPolitician(payload) {
    return instance.post(resource, payload);
  },
  editPolitician(politicianId, payload) {
    return instance.put(`${resource}/${politicianId}`, payload);
  },
  editPoliticianBackground(politicianId, payload) {
    return instance.post(`${resource}/${politicianId}/background`, payload);
  },
  createAccomplishment(politicianId, payload) {
    return instance.post(`${resource}/${politicianId}/accomplishments`, payload);
  },
  editAccomplishment(politicianId, accomplishmentId, payload) {
    return instance.put(`${resource}/${politicianId}/accomplishments/${accomplishmentId}`, payload);
  },
  deleteAccomplishment(politicianId, accomplishmentId) {
    return instance.delete(`${resource}/${politicianId}/accomplishments/${accomplishmentId}`);
  },
};
