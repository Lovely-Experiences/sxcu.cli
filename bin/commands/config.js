// eslint-disable-next-line no-unused-vars
const defaultConfig = {
    _name: 'unnamed',
    _version: 1,
    subdomain: null,
    collectionId: null,
    subdomainToken: null,
    collectionToken: null,
    noEmbed: false,
    selfDestruct: false,
    openGraph: {
        title: null,
        description: null,
        color: null,
        siteName: null,
        discordHideUrl: true,
    },
};

const actions = {};

actions['actions'] = {
    name: 'actions',
    description: 'Get a list of all available config actions.',
    usage: 'sxcu config actions',
    run: function (data) {
        data.log('[info] Listing actions of the "config" command.');
        for (const action of Object.values(actions)) {
            data.log(`[info] ${action.usage}`);
        }
        return;
    },
};

module.exports = {
    name: 'config',
    aliases: [],
    description:
        'Manage configuration files, these files can be used in other commands. If you\'re looking for general configuration, please run "sxcu settings".',
    usage: 'sxcu config <action>',
    run: function (data) {
        const command = data.arguments[1];
        if (command === undefined) {
            data.log('[info] For a list of actions, please run "sxcu config actions".');
            return;
        }
        const action = actions[command];
        if (action !== undefined) {
            action.run(data);
        } else {
            data.log(
                `[error] Action "${command}" does not exist.\n[info] For a list of actions, please run "sxcu config actions".`
            );
        }
        return;
    },
};
