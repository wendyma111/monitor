// 本文件处理放置在工程根目录的配置文件monitor.json
// 自定义配置有三个方式：
// 1、通过命令行 --command
// 2、在项目根目录设置monitor.json
// 3、在目标工程package.josn中设置monitorConfig字段

const path = require('path')
const fs = require('fs')
const argvConfig = require('./cli.js')
const config = require('./config.js')
const monitor = require('./monitor.js')

const root = process.cwd()

const monitorJsonPath = path.resolve(root, 'monitor.json');
const packageJsonPath = path.resolve(root, 'package.json');

module.exports = function() {
    fs.stat(monitorJsonPath, function(err, stats) {
        let monitorJsonConfig;
        if(stats) {
            monitorJsonConfig = stats.isFile() && require(monitorJsonPath);
        }
        const packageJsonConfig = require(packageJsonPath).monitorConfig;
        // 优先级：monitorConfig字段 > monitor.json > --command
        const finalConfig = Object.assign(packageJsonConfig || {}, monitorJsonConfig || {}, argvConfig || {});

        for(let p in finalConfig) {
            config.make(p, finalConfig[p])
        } 
        monitor(config)
    })
}