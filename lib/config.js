// 本文件集合所有功能配置
// 提供自定义监听目录（watch）、忽略目录（ignored）、events()
const path = require("path");
const fs = require("fs");
const root = process.cwd();
module.exports = {
  // 入口文件
  entryFile: (function () {
    // 拿到命令行参数
    const argv = process.argv.slice(2);
    let entryFile; //入口文件
    let main = require(path.resolve(root, "package.json")).main; // package.json的main字段
    // 找到入口文件
    if (fs.statSync(path.resolve(root, argv[0])).isFile()) {
      entryFile = argv[0];
    } else if (fs.existsSync(path.resolve(root, "package.json")) && main) {
      // 进入package.json文件中找main字段
      entryFile = main;
    } else if (fs.existsSync(path.resolve(root, "index.js"))) {
      // 找到root/index.js为入口文件
      entryFile = "index.js";
    } else {
      throw new Error("没有找到入口文件");
    }
    return entryFile;
  })(),
  // 默认的监听目录
  watch: ".",
  ignore: null,
  delay: 0,
  make: function(property, content){
    this[property] = content;
  },
};
