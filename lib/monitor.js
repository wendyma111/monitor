const chokidar = require("chokidar");
const createChild = require("./createChildProcess.js");
module.exports = function (config) {
  const { watch, ignore, delay } = config;

  chokidar
    .watch(watch, {
      cwd: process.cwd(),
      ignored: ignore,
    })
    .on("ready", createChild.bind(null))
    .on("change", function () {
      setTimeout(() => {
        process.kill(0, "SIGUSR2");
      }, delay)
    });
};
