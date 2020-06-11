// app.json配置信息相互转换
const objectAddAttribute = (obj, attributeOne, attributeTwo) => {
    let _obj = { ...obj };
    if (_obj[attributeOne] !== undefined) {
        _obj = {
            ..._obj,
            [attributeTwo]: _obj[attributeOne],
        };
        delete _obj[attributeOne];
    }
    return _obj;
};

const wechatToAlipay = (str) => {
    const strValue = JSON.parse(str);
    let result = {
        ...strValue,
    };
    if (strValue.window) {
        let _window = strValue.window;
        _window = objectAddAttribute(_window, 'navigationBarTitleText', 'defaultTitle');
        _window = objectAddAttribute(_window, 'enablePullDownRefresh', 'pullRefresh');
        _window = objectAddAttribute(_window, 'backgroundColor', 'backgroundColor');
        _window = objectAddAttribute(_window, 'navigationBarBackgroundColor', 'titleBarColor');
        _window = objectAddAttribute(_window, 'onReachBottomDistance', 'onReachBottomDistance');
        result = {
            ...result,
            window: {
                ..._window,
            },
        };
    }
    return JSON.stringify(result, null, '\t');
};

const alipayToWechat = (str) => {
    const strValue = JSON.parse(str);
    let result = {
        ...strValue,
    };
    if (strValue.window) {
        let _window = strValue.window;
        _window = objectAddAttribute(_window, 'defaultTitle', 'navigationBarTitleText');
        _window = objectAddAttribute(_window, 'pullRefresh', 'enablePullDownRefresh');
        _window = objectAddAttribute(_window, 'backgroundColor', 'backgroundColor');
        _window = objectAddAttribute(_window, 'titleBarColor', 'navigationBarBackgroundColor');
        _window = objectAddAttribute(_window, 'onReachBottomDistance', 'onReachBottomDistance');
        result = {
            ...result,
            window: {
                ..._window,
            },
        };
    }
    return JSON.stringify(result, null, '\t');
};

module.exports = {
    wechatToAlipay,
    alipayToWechat,
};