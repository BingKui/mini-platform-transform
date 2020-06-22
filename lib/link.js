const path = require('path');
// 交互式命令界面
const inquirer = require('inquirer');
// 命令行loading工具
const ora = require('ora');

const logger = require('../common/logger');

const cwd = process.cwd();

const { PLATFORM_VALUE } = require('../constants/platform');
const { getJsonFileList, changeFileKey } = require('../common/link');

function getTemplate() {
    const arr = [];
    for (let key in PLATFORM_VALUE) {
        arr.push({
            name: PLATFORM_VALUE[key].name,
            value: PLATFORM_VALUE[key].value,
            short: PLATFORM_VALUE[key].name,
        });
    }
    return arr;
}

module.exports = function (args) {
    logger.info('开始转换小程序引用方式');
    // 1.让用户选择平台转换方式
    const questions = [{
        type: 'list',
        name: 'platform',
        message: '当前平台',
        choices: getTemplate(),
    }];
    inquirer.prompt(questions).then(function (answers) {
        const { platform } = answers;
        const tempPath = path.join(cwd, '.');
        logger.warn('转换的根目录为：', tempPath)
        const spinner = ora('引用方式转换中...');
        const fileList = getJsonFileList(tempPath, {
            json: 'json',
            xml: PLATFORM_VALUE[platform].fileExt,
        });
        for (let i = 0; i < fileList.length; i++) {
            changeFileKey(fileList[i]);
        }
        spinner.stop();
    });
};