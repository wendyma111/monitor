const child_process = require('child_process');
const path = require('path')
const { entryFile, restart } = require('./config.js')

// ------------ 监听SIGUSR2信号，表示某文件被修改了 需要重新启动 ---------
// 此处必须监听SIGUSR2信号事件，因为process.kill(0, signal)是向进程组中所有进程发送信号
// 包括父进程，所以必须监听该信号 否则会执行默认的系统动作————结束进程
process.on('SIGUSR2', function(){
    // 只有管道两端都关闭，管道才会消失，所以要调用unpipe，防止内存泄漏
    child.stdout.unpipe(process.stdout)
    child.stderr.unpipe(process.stderr)
    createChild();
    // 此处选择exec 因为spawn要将命令和参数拆开传
    // 比如要将exec('kill -0 5151') -> spawn('kill',['-0', '5151'])
    if (restart) {
        const child = child_process.exec(restart)
        child.stdout.pipe(process.stdout)
    }
})

// ------------如果父进程关闭则处理关闭所有子进程 避免进程成为孤儿进程--------
process.on('exit', function() {
    process.kill(0, 'SIGKILL')
})

// -------------- 监测到用户输入rs则重新启动---------------
// 按enter键才执行
// 如果使用 readable.setEncoding() 为流指定了默认的字符编码，则监听器回调传入的数据为字符串，否则传入的数据为 Buffer。
process.stdin.setEncoding('utf8');
process.stdin.on('data', function(chunk) {
    chunk = chunk.slice(0, chunk.length - 1);
    if(chunk === 'rs') {
        process.kill(0, "SIGUSR2");
    }
})

// -----------------------启动子进程执行入口文件------------------
function createChild() {
    child = child_process.spawn('node', [path.resolve(process.cwd(), entryFile)], {stdio: ['pipe', process.stdout, process.stderr]})
    console.log('=======重新启动于进程：' + child.pid + '=========')
}

module.exports = createChild