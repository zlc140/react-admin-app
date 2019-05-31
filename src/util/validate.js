/**
 * 是否为手机号
 * @param mobile
 * @returns {boolean}
 */
export function isMobile(mobile) {
    if (mobile) {
        return /^1[3-9][0-9]\d{8}$/.test(mobile)
    } else {
        return false
    }
}

/**
 * 是否为密码格式
 * @param password
 * @returns {boolean}
 */
export function isPassword(password) {
    if (password) {
        return /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test(password)
    } else {
        return false
    }
}

/**
 * 是否符合图片验证码和短信验证码格式
 * @param smsCode
 * @returns {boolean}
 */
export function isSmsCode(smsCode) {
    if (smsCode) {
        return /^[0-9]{4}$/.test(smsCode)
    } else {
        return false
    }
}
