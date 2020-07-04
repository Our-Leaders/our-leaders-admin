class NavigatorUtil {
  static isMobile() {
    console.log(navigator.userAgent);
    console.log((/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase())));
    return (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()));
  }
}

export default NavigatorUtil;
