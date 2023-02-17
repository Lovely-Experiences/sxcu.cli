module.exports = {
    name: 'version',
    aliases: ['-v'],
    description: 'Get the current version of the cli, api module, and Node.',
    usage: 'sxcu version',
    run: function (data) {
        const packageFile = require(`${__dirname}/../../package.json`);
        const mainVersion = packageFile.version;
        const apiVersion = packageFile.dependencies['sxcu.api'].replace('^', '');
        const nodeVersion = process.version;
        data.log(
            `[info] sxcu.cli v${mainVersion} | sxcu.api v${apiVersion} | Node.js ${nodeVersion}\n[warn] sxcu.api version may be inaccurate on custom/modified installations.`
        );
        return;
    },
};
