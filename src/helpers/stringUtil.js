/**
 * Created by bolor on 1/13/2020
 */

class StringUtil {
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
