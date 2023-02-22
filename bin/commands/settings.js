module.exports = {
    name: 'settings',
    aliases: [],
    description: 'View and edit settings.',
    usage: 'sxcu settings <action: view/set/path>',
    run: function (data) {
        const dataModule = data.modules['data'];
        switch (data.arguments[1]) {
            case 'view': {
                const config = dataModule.getConfig();
                const configDescriptions = dataModule.configDescriptions;
                for (const [setting, value] of Object.entries(config)) {
                    const description = configDescriptions[setting];
                    const green = data.colors.green;
                    const yellow = data.colors.yellow;
                    const reset = data.colors.reset;
                    data.log(`[info] ${yellow}${setting}${reset} (${typeof value}) -> ${green}${value}${reset}`);
                    data.log(`[info] ^ ${description}`);
                }
                break;
            }
            case 'path': {
                data.log(
                    `[info] Path to the config file can be found here: "${dataModule.getDataFolder()}/config.json"`
                );
                break;
            }
            case 'set': {
                const setting = data.arguments[2];
                const value = data.arguments[3];
                if (!setting || !value) {
                    data.log(`[error] Please provide all parameters. "sxcu settings set <setting> <value>"`);
                    data.log('[info] "setting" is not case-sensitive, however "value" is.');
                    return;
                }
                // TODO: finish this - @jacobhumston
                break;
            }
            default: {
                data.log('[error] Invalid action provided, please run "sxcu settings <action>".');
                data.log('[info] Actions: view, set, path');
            }
        }
    },
};
