class NavigatorUtil {
  static isMobile() {
    return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
  }
}

export default NavigatorUtil;
