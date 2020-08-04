import instance from './services';

const resource = '/statistics';

const parseQueryString = query => Object.keys(query).map(key => `${key}=${query[key]}`).join('&');

export default {
  getStats() {
    return instance.get(resource);
  },

  getVisits(query = {}) {
    const queryString = parseQueryString(query);
    let url = `${resource}/visit`;

    if (queryString) {
      url = `${url}?${queryString}`;
    }

    return instance.get(url);
  },

  getSignups(query = {}) {
    const queryString = parseQueryString(query);
    let url = `${resource}/signup`;

    if (queryString) {
      url = `${url}?${queryString}`;
    }

    return instance.get(url);
  },

  getLocationPlot(query = {}) {
    const queryString = parseQueryString(query);
    let url = `${resource}/locations`;

    if (queryString) {
      url = `${url}?${queryString}`;
    }

    return instance.get(url);
  },
};
