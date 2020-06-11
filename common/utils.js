const fs = require('fs-extra');
const { whiteListFolder } = require('../constants/emnu');
const { WECHAT_FILE_SUFFIX, ALIPAY_FILE_SUFFIX } = require('../constants/platform');
/**
 * 获取文件夹下的所有文件
 * @param {String} path 文件夹地址
 */
const readFileList = (path, fileSuffix) => {
    let filesList = [];
    let files = fs.readdirSync(path);
    files.forEach(function (file, index) {
        if (fs.statSync(path + file).isDirectory()) { //isDirectory 判断是不是目录
            if (whiteListFolder.indexOf(file) < 0) {
                //递归读取文件
                filesList = filesList.concat(readFileList(`${path}${file}/`, fileSuffix));
            }
        } else {
            const _suffix = getFileInfo(file).suffix;
            fileSuffix.indexOf(_suffix) > -1 && filesList.push({
                path, // 路径
                file, // 文件
            });
        }
    })
    return filesList;
};

const getFileInfo = (file) => {
    const arr = file.split('.');
    let name = '';
    for (let i = 0; i < arr.length - 1; i++) {
        name += `${arr[i]}.`;
    }
    return {
        name: name.substring(0, name.length - 1),
        suffix: arr[arr.length - 1],
    };
};

const changeExtFile = (path, file, tempalteExt, targetExt) => {
    let content = fs.readFileSync(`${path}/${file}`, 'utf8');
    const { suffix } = getFileInfo(file);
    const _suffix = [WECHAT_FILE_SUFFIX.file_xml, ALIPAY_FILE_SUFFIX.file_xml];
    let _content = [];
    if (_suffix.indexOf(suffix) > -1) {
        const content_arr = content.split('/>');
        for (let i = 0; i < content_arr.length; i++) {
            let item = `${content_arr[i]}`;
            if (item.indexOf(`<${tempalteExt.tag_name}`) > -1) {
                // 需要特殊处理
                for (let key in tempalteExt) {
                    if (key === 'tag_name') {
                        item = item.replace(new RegExp(`<${tempalteExt[key]}`, 'gm'), `<${targetExt[key]}`);
                    } else {
                        item = item.replace(new RegExp(`${tempalteExt[key]}`, 'gm'), `${targetExt[key]}`);
                    }
                    console.log(`${tempalteExt[key]}`, `${targetExt[key]}`);
                }
            }
            _content.push(item)
        }
        content = _content.join('/>')
    }
    const _suffix2 = [WECHAT_FILE_SUFFIX.file_ext, ALIPAY_FILE_SUFFIX.file_ext];
    if (_suffix2.indexOf(suffix) > -1) {
        content = content.replace(new RegExp(`${tempalteExt.value_suffix}`, 'gm'), targetExt.value_suffix);
    }
    fs.writeFileSync(`${path}/${file}`, content, 'utf8');
};

const changeContentPrefix = (path, file, tempaltePrefix, targetPrefix) => {
    let content = fs.readFileSync(`${path}/${file}`, 'utf8');
    const { suffix } = getFileInfo(file);
    const _suffix = [WECHAT_FILE_SUFFIX.file_xml, ALIPAY_FILE_SUFFIX.file_xml];
    if (_suffix.indexOf(suffix) > -1) {
        for (let key in tempaltePrefix) {
            content = `${content}`.replace(new RegExp(tempaltePrefix[key], 'gm'), targetPrefix[key]);
        }
        fs.writeFileSync(`${path}/${file}`, content, 'utf8');
    }
};
const changeCssContentPrefix = (path, file, tempaltePrefix, targetPrefix) => {
    let content = fs.readFileSync(`${path}/${file}`, 'utf8');
    const { suffix } = getFileInfo(file);
    const _suffix = [WECHAT_FILE_SUFFIX.file_css, ALIPAY_FILE_SUFFIX.file_css];
    if (_suffix.indexOf(suffix) > -1) {
        for (let key in tempaltePrefix) {
            content = `${content}`.replace(new RegExp(tempaltePrefix, 'gm'), targetPrefix);
        }
        fs.writeFileSync(`${path}/${file}`, content, 'utf8');
    }
};

const renameFileSuffix = (path, file, tempalteSuffix, targetSuffix) => {
    const { name, suffix } = getFileInfo(file);
    let _key = '';
    for (let key in tempalteSuffix) {
        if (suffix === tempalteSuffix[key]) {
            _key = key;
            break;
        }
    }
    fs.renameSync(`${path}/${file}`, `${path}/${name}.${targetSuffix[_key]}`);
};

module.exports = {
    readFileList,
    changeExtFile,
    changeContentPrefix,
    changeCssContentPrefix,
    renameFileSuffix,
};