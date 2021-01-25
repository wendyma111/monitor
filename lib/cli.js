// 本文件处理命令行参数
const config = require("./config.js");

const argvs = process.argv.slice(2);
const argvConfig = {};
argvs.forEach(function (item, index) {
  if (item.indexOf("--") === 0) {
    const command = item.slice(2);
    if (command in config && index + 1 <= argvs.length) {
      argvConfig[command] = argvs[index + 1];
    }
  }
});

module.exports = argvConfig;
