const fs = require('fs');
const logger = require('./logger');
const { getFileInfo } = require('./utils');
// 白名单
const whiteListFolder = ['node_modules', '.vscode'];

const getJsonFileList = (folderPath, fileSuffix) => {
    let filesList = [];
    let files = fs.readdirSync(folderPath);
    files.forEach(function (file, index) {
        if (fs.statSync(folderPath + file).isDirectory()) { //isDirectory 判断是不是目录
            if (whiteListFolder.indexOf(file) < 0) {
                //递归读取文件
                filesList = filesList.concat(getJsonFileList(`${folderPath}${file}/`, fileSuffix));
            }
        } else {
            const { name, suffix } = getFileInfo(file);
            fileSuffix.json === suffix && filesList.push({
                jsonFile: `${folderPath}/${name}.${fileSuffix.json}`,
                xmlFile:  `${folderPath}/${name}.${fileSuffix.xml}`,
            });
        }
    })
    return filesList;
};

const changeFileKey = (fileItem) => {
    const jsonFileContent = fs.readFileSync(fileItem.jsonFile, 'utf-8');
    let xmlFileContent = fs.readFileSync(fileItem.xmlFile, 'utf-8');
    const content = JSON.parse(jsonFileContent);
    let result = {};
    for (let key in content.usingComponents) {
        let _key = key.replace(/([A-Z])/g,'-$1').toLowerCase();
        console.log(key,  _key.substr(1))
        xmlFileContent = xmlFileContent.replace(new RegExp(`<${key}`, 'gm'), `<${_key.substr(1)}`);
        xmlFileContent = xmlFileContent.replace(new RegExp(`${key}>`, 'gm'), `${_key.substr(1)}>`);
        result = {
            ...result,
            [_key.substr(1)]: content.usingComponents[key],
        };
    }
    content['usingComponents'] = result;
    fs.writeFileSync(fileItem.jsonFile, JSON.stringify(content, null, '\t'), 'utf-8');
    logger.success('JSON文件修改完成', fileItem.jsonFile);
    fs.writeFileSync(fileItem.xmlFile, xmlFileContent, 'utf-8');
    logger.success('XML文件修改完成', fileItem.xmlFile);
};

module.exports = {
    getJsonFileList,
    changeFileKey,
};