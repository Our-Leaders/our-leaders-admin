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
};