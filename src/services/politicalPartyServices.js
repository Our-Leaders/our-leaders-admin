import instance from './services';

const resource = '/political-party';

export default {
  getPoliticalParties(filter = {}) {
    const queryString = Object.keys(filter).map(key => `${key}=${filter[key]}`).join('&');
    let url = `${resource}`;

    if (queryString) {
      url = `${url}?${queryString}`;
    }
    return instance.get(url);
  },
  getPoliticalParty(partyId) {
    return instance.get(`${resource}/${partyId}`);
  },
  createNewPoliticalParty(payload) {
    return instance.post(resource, payload);
  },
  editPoliticalParty(politicalPartyId, payload) {
    return instance.put(`${resource}/${politicalPartyId}`, payload);
  },
  deletePoliticalParty(politicalPartyId) {
    return instance.delete(`${resource}/${politicalPartyId}`);
  },
};
