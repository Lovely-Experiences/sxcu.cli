const os = require('os');
const fs = require('fs');

const homeDir = os.homedir();

const defaultSettings = {
    saveLogs: false,
    noColors: false,
    outputBackups: true,
};

const settingDescriptions = {
    saveLogs:
        'If true, all outputs from sxcu.cli will be added to a log.json file. Only recommended for testing purposes.',
    noColors: 'If true, colors will be removed from all responses.',
    outputBackups:
        'If true, whenever an output file is created, it will also be saved under a backup directory. (.sxcu-cli/backups)',
};

// This methods will create the storage folders if they are not already present.
function createDataFolders() {
    if (!fs.existsSync(`${homeDir}/.sxcu-cli`)) {
        fs.mkdirSync(`${homeDir}/.sxcu-cli`);
    }

    if (!fs.existsSync(`${homeDir}/.sxcu-cli/configs`)) {
        fs.mkdirSync(`${homeDir}/.sxcu-cli/configs`);
    }

    if (!fs.existsSync(`${homeDir}/.sxcu-cli/backups`)) {
        fs.mkdirSync(`${homeDir}/.sxcu-cli/backups`);
    }

    if (!fs.existsSync(`${homeDir}/.sxcu-cli/README.txt`)) {
        fs.writeFileSync(
            `${homeDir}/.sxcu-cli/README.txt`,
            'This directory is used by the NPM package "sxcu.cli". If you no longer use this package, feel free to remove it!\nhttps://github.com/Lovely-Experiences/sxcu.cli'
        );
    }

    if (!fs.existsSync(`${homeDir}/.sxcu-cli/config.json`)) {
        fs.writeFileSync(`${homeDir}/.sxcu-cli/config.json`, JSON.stringify(defaultSettings, null, 4));
    }

    return;
}

module.exports = {
    getDataFolder: () => {
        createDataFolders();
        return `${homeDir}/.sxcu-cli`;
    },
    getConfig: () => {
        createDataFolders();
        const config = require(`${homeDir}/.sxcu-cli/config.json`);
        for (const [setting, value] of Object.entries(defaultSettings)) {
            if (typeof config[setting] !== typeof value) {
                config[setting] = value;
            }
        }
        module.exports.updateConfig(config);
        return config;
    },
    updateConfig: (data) => {
        createDataFolders();
        fs.writeFileSync(`${homeDir}/.sxcu-cli/config.json`, JSON.stringify(data, null, 4));
        return;
    },
    configDescriptions: settingDescriptions,
};
