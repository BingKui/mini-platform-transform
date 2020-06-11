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
const PLUGIN = require('../common/plugin');

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
    logger.info('开始转换小程序插件配置信息');
    // 1.让用户选择平台转换方式
    const questions = [{
        type: 'list',
        name: 'position',
        message: '转换方向选择',
        choices: getTemplate(),
    }];
    inquirer.prompt(questions).then(function (answers) {
        console.log('回答结果：', answers);
        const { position } = answers;
        
        // 转换文件后缀
        const targetFile = path.join(cwd, './plugin.json');
        const spinner = ora('插件配置文件转换中...');
        if (exists(targetFile)) {
            spinner.start();
            const pluginStr = fs.readFileSync(targetFile, 'utf-8');
            const content = PLUGIN[position](pluginStr);
            fs.writeFileSync(targetFile, content, 'utf-8');
        }
        spinner.stop();
    });
};