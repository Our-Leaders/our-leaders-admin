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

  static urlRegex() {
    // eslint-disable-next-line no-useless-escape
    return "^(?:http(s)?://)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&'\\(\\)\\*\\+,;=.]+$";
  }
}

export default StringUtil;
