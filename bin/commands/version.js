module.exports = {
    name: 'version',
    aliases: ['-v'],
    description: 'Get the current version of the cli, api module, and Node.',
    usage: 'sxcu version',
    run: function (data) {
        const packageFile = require(`${__dirname}/../../package.json`);
        const packageLockFile = require(`${__dirname}/../../package-lock.json`);
        const mainVersion = packageFile.version;
        const apiVersion = packageLockFile.packages['node_modules/sxcu.api'].version;
        const nodeVersion = process.version;
        data.log(`[info] sxcu.cli v${mainVersion} | sxcu.api v${apiVersion} | Node.js ${nodeVersion}`);
        return;
    },
};
