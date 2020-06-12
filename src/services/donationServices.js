import instance from './services';

const resource = '/statistics/donations';

const parseQueryString = query => Object.keys(query).map(key => `${key}=${query[key]}`).join('&');

export default {
  getDonationPlotStats(query = {}) {
    const queryString = parseQueryString(query);

    let url = `${resource}/plot`;

    if (queryString) {
      url = `${url}?${queryString}`;
    }

    return instance.get(url);
  },
  getDonations(query = {}) {
    const queryString = parseQueryString(query);

    let url = `${resource}`;

    if (queryString) {
      url = `${url}?${queryString}`;
    }

    return instance.get(url);
  },
};
