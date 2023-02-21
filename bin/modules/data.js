const os = require('os');
const fs = require('fs');

const homeDir = os.homedir();

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

    return;
}

module.exports = {
    getDataFolder: () => {
        createDataFolders();
        return `${homeDir}/.sxcu.cli`;
    },
};
