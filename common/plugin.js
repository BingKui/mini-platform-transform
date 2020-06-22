// 插件配置信息相互转换
const wechatToAlipay = (str) => {
    const strValue = JSON.parse(str);
    const result = {
        publicComponents: strValue.publicComponents || {},
        publicPages: strValue.pages || {},
        pages: Object.values(strValue.pages) || [],
        main: strValue.main || '',
    };
    return JSON.stringify(result, null, '\t');
};

const alipayToWechat = (str) => {
    const strValue = JSON.parse(str);
    const result = {
        publicComponents: strValue.publicComponents || {},
        pages: strValue.pages || {},
        main: strValue.main || '',
    };
    return JSON.stringify(result, null, '\t');
};

module.exports = {
    wechatToAlipay,
    alipayToWechat,
};