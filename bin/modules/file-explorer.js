const childProcess = require('child_process');
const platform = process.platform;

let cmd = null;
switch (platform) {
    case 'win32':
        cmd = 'explorer';
        break;
    case 'linux':
        cmd = 'xdg-open';
        break;
    case 'darwin':
        cmd = 'open';
        break;
}

module.exports = {
    open: function (path) {
        if (!cmd) throw 'Unsupported platform.';
        childProcess.spawn(cmd, [path], { detached: true }).unref();
        // Reference: https://stackoverflow.com/a/75194906/20070537
    },
};
