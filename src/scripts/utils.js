/**
 * 探测当前系统类型 是否是手机终端
 * @returns {Object} obj
 * @returns {String} obj.os 操作系统名称
 * @returns {Boolean} obj.ios
 * @returns {Boolean} obj.ipad
 * @returns {Boolean} obj.iphone
 * @returns {Boolean} obj.android
 */
export const detectOS = () => {
    const ua = navigator.userAgent
    const android = /(Android);?[\s/]+([\d.]+)?/.test(ua)
    const ipad = /(iPad).*OS\s([\d_]+)/.test(ua)
    const iphone = !ipad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
    const ios = iphone || ipad

    return {
        isMobile: android || ios,
        os: android ? 'android' : 'ios',
        ios,
        ipad,
        iphone,
        android
    }
}
