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
                let setting = data.arguments[2];
                let value = data.arguments[3];
                if (!setting || !value) {
                    data.log(`[error] Please provide all parameters. "sxcu settings set <setting> <value>"`);
                    data.log('[info] "setting" is not case-sensitive, however "value" is.');
                    return;
                }
                const config = dataModule.getConfig();
                for (const key of Object.keys(config)) if (setting.toLowerCase() === key.toLowerCase()) setting = key;
                if (config[setting] === undefined) {
                    data.log(`[error] "${setting}" is not a valid setting.`);
                } else {
                    if (typeof config[setting] === 'boolean') {
                        const convertedValue = value.toLowerCase();
                        if (convertedValue === 'true' || convertedValue === 'false') {
                            config[setting] = convertedValue === 'true';
                            dataModule.updateConfig(config);
                            data.log(`[success] "${setting}" has been set to "${config[setting]}".`);
                        } else {
                            data.log(`[error] "${value}" is not a valid boolean.`);
                        }
                    } else if (typeof config[setting] === 'string') {
                        config[setting] = value;
                        dataModule.updateConfig(config);
                        data.log(`[success] "${setting}" has been set to "${config[setting]}".`);
                    } else {
                        data.log(`[error] The setting "${setting}" has an unsupported type.`);
                    }
                }
                break;
            }
            default: {
                data.log('[error] Invalid action provided, please run "sxcu settings <action>".');
                data.log('[info] Actions: view, set, path');
            }
        }
    },
};
