const os = require('os');
const fs = require('fs');

const homeDir = os.homedir();

const defaultSettings = {
    saveLogs: false,
};

const settingDescriptions = {
    saveLogs:
        'If true, all outputs from sxcu.cli will be added to a log.json file. Only recommended for testing purposes.',
};

// This methods will create the storage folders if they are not already present.
function createDataFolders() {
    if (!fs.existsSync(`${homeDir}/.sxcu-cli`)) {
        fs.mkdirSync(`${homeDir}/.sxcu-cli`);
    }

    if (!fs.existsSync(`${homeDir}/.sxcu-cli/configs`)) {
        fs.mkdirSync(`${homeDir}/.sxcu-cli/configs`);
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
        return require(`${homeDir}/.sxcu-cli/config.json`);
    },
    updateConfig: (data) => {
        createDataFolders();
        fs.writeFileSync(`${homeDir}/.sxcu-cli/config.json`, JSON.stringify(data, null, 4));
        return;
    },
    configDescriptions: settingDescriptions,
};
