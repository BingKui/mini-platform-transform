// 微信文件后缀
const WECHAT_FILE_SUFFIX = {
    file_css: 'wxss',
    file_xml: 'wxml',
    file_ext: 'wxs',
};
// 支付宝文件后缀
const ALIPAY_FILE_SUFFIX = {
    file_css: 'acss',
    file_xml: 'axml',
    file_ext: 'sjs',
};
// 抖音文件后缀
const DOUYIN_FILE_SUFFIX = {};
// 微信内容标签前缀
const WECHAT_CONTENT_PREFIX = {
    tag_if: 'wx:if',
    tag_else_if: 'wx:elif',
    tag_else: 'wx:else',
    tag_for: 'wx:for',
    tag_key: 'wx:key',
    file_suffix: 'wxs',
};
// 支付宝内容标签前缀
const ALIPAY_CONTENT_PREFIX = {
    tag_if: 'a:if',
    tag_else_if: 'a:elif',
    tag_else: 'a:else',
    tag_for: 'a:for',
    tag_key: 'a:key',
    file_suffix: 'sjs',
};
// 抖音内容标签前缀
const DOUYIN_CONTENT_PREFIX = {};

// 自有文件引入修改
// 微信自有文件格式
const WECHAT_EXT = {
    tag_name: 'wxs',
    value_suffix: '.wxs',
    value_src: 'src',
    value_name: 'module',
};
// 支付宝自有文件格式
const ALIPAY_EXT = {
    tag_name: 'import-sjs',
    value_suffix: '.sjs',
    value_src: 'from',
    value_name: 'name',
};
// 抖音自有文件格式
const DOUYIN_EXT = {};

const PLATFORM = {
    wechatToAlipay: {
        name: '微信小程序 => 支付宝小程序',
        value: 'wechatToAlipay',
        short: 'wechat => alipay',
        tempalte: {
            file: WECHAT_FILE_SUFFIX,
            content: WECHAT_CONTENT_PREFIX,
            ext: WECHAT_EXT,
        },
        target: {
            file: ALIPAY_FILE_SUFFIX,
            content: ALIPAY_CONTENT_PREFIX,
            ext: ALIPAY_EXT,
        },
    },
    alipayToWechat: {
        name: '支付宝小程序 => 微信小程序',
        value: 'alipayToWechat',
        short: 'alipay => wechat',
        tempalte: {
            file: ALIPAY_FILE_SUFFIX,
            content: ALIPAY_CONTENT_PREFIX,
            ext: ALIPAY_EXT,
        },
        target: {
            file: WECHAT_FILE_SUFFIX,
            content: WECHAT_CONTENT_PREFIX,
            ext: WECHAT_EXT,
        },
    },
};

module.exports = {
    PLATFORM,
    WECHAT_FILE_SUFFIX,
    ALIPAY_FILE_SUFFIX,
};