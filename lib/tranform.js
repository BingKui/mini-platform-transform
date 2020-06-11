const path = require('path');
// fs 扩展库
const fs = require('fs-extra');
// 命令行库
const shell = require('shelljs');
// 交互式命令界面
const inquirer = require('inquirer');
// 命令行loading工具
const ora = require('ora');
// node 原生文件操作方法
const exists = require('fs').existsSync;

const { say } = require('cfonts');

const logger = require('../common/logger');

const cwd = process.cwd();

const { PLATFORM } = require('../constants/platform');
const { readFileList, renameFileSuffix, changeContentPrefix, changeCssContentPrefix, changeExtFile } = require('../common/utils');

function getTemplate() {
    const arr = [];
    for (let key in PLATFORM) {
        arr.push({
            name: PLATFORM[key].name,
            value: PLATFORM[key].value,
            short: PLATFORM[key].short,
        });
    }
    return arr;
}

module.exports = function (args) {
    logger.info('开始转换小程序平台');
    // 1.让用户选择平台转换方式、是否是插件模式
    // 2.转换文件后缀
    // 3.替换相应的前缀字段
    // 4.插件模式下，修改plugin.json
    // 5.选择提交平台
    // 6.根据选择的分支，执行提交分支
    const questions = [{
        type: 'list',
        name: 'position',
        message: '转换方向选择',
        choices: getTemplate(),
    }];
    inquirer.prompt(questions).then(function (answers) {
        const { position } = answers;
        // 转换文件后缀
        const targetPath = path.join(cwd, './');
        const spinner = ora('项目转换中...');
        spinner.start();
        const fileSuffix = [];
        const tempalteSuffix = PLATFORM[position].tempalte.file;
        const targetSuffix = PLATFORM[position].target.file;
        const tempaltePrefix = PLATFORM[position].tempalte.content;
        const targetPrefix = PLATFORM[position].target.content;
        const tempalteExt = PLATFORM[position].tempalte.ext;
        const targetExt = PLATFORM[position].target.ext;
        for (let key in tempalteSuffix) {
            fileSuffix.push(tempalteSuffix[key]);
        }
        const fileList = readFileList(targetPath, fileSuffix);
        fileList.forEach(item => {
            changeExtFile(item.path, item.file, tempalteExt, targetExt);
            changeContentPrefix(item.path, item.file, tempaltePrefix, targetPrefix);
            changeCssContentPrefix(item.path, item.file, tempalteSuffix.file_css, targetSuffix.file_css);
            renameFileSuffix(item.path, item.file, tempalteSuffix, targetSuffix);
        });
        spinner.stop();
    });
};