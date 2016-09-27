var exec = require('child_process').exec;
var colors = require('colors');
var endl = '\r\n';
var prefix = '[fanli generator]'.green + ' - '.green + Date.now().toString().green + ' ';
var isWin = process.platform.indexOf('win') === 0;
var urlReg = /^(http(s)?:\/\/)?[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/ig;

function _isUrl(url) {
    urlReg.lastIndex = 0;
    return urlReg.test(url);
}

function _log(content) {
    process.stdout.write(prefix + content + endl);
}

function _format() {
    for (var originStr = arguments[0], i = 0; i < arguments.length; ++i) {
        originStr = originStr.replace(new RegExp('\\{' + i + '\\}', 'g'), arguments[i + 1]);
    }
    return originStr;
}

function _open(url) {
    if (isWin && _isUrl(url)) {
        exec(format('start {0}', url), () => {
            _log(format('opened: {0}', url));
        });
    }
}

module.exports = {
    log: _log,
    format: _format,
    isWin: isWin,
    open: _open
};