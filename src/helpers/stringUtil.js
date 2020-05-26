/**
 * Created by bolor on 1/13/2020
 */

class StringUtil {
  static generateUrl(url, filter) {
    if (!filter || typeof filter !== 'object') {
      return url;
    }

    let formattedUrl = url;

    const keys = Object.keys(filter);

    if (keys.length === 0) {
      return formattedUrl;
    }

    keys.forEach((key, index) => {
      if (index === 0) {
        formattedUrl += `?${key}=${filter[key]}`;
      } else {
        formattedUrl += `&${key}=${filter[key]}`;
      }
    });

    return formattedUrl;
  }

  static getErrorText(err) {
    if (typeof err === 'string') {
      return err;
    }

    if (!err.response || !err.response.data) {
      return 'An error occurred. Please try again.';
    }

    return err.response.data.message;
  }

  static getUrlRegex() {
    // eslint-disable-next-line no-useless-escape
    return "^(?:http(s)?://|www)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$";
  }

  static getUrlHost(url = '') {
    // eslint-disable-next-line no-useless-escape
    const friendlyUrl = url.match(/(?:w{3}\\.)?([a-z\d\\.-]+)\.(?:[a-z\\.]{2,20})/g);
    if (friendlyUrl) {
      return friendlyUrl[0];
    }
    return url;
  }
}

export default StringUtil;
