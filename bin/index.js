#!/usr/bin/env node

////////////// Variables

const fs = require('fs');
// eslint-disable-next-line no-shadow-restricted-names
const arguments = process.argv.slice(2);
const command = arguments[0];
const commands = {};
const modules = {};
const colors = { reset: '\u001b[0m', red: '\u001b[31m', blue: '\u001b[34m', yellow: '\u001b[33m', green: '\u001b[32m' };

////////////// Methods
let breakNextLine = false;
function log(message, clearLastLine) {
    const dataModule = modules['data'];
    const config = dataModule.getConfig();
    const dataFolder = dataModule.getDataFolder();

    let messageToLog = message
        .replaceAll('[info]', `${colors.blue}[info]${colors.reset}`)
        .replaceAll('[warn]', `${colors.yellow}[warn]${colors.reset}`)
        .replaceAll('[error]', `${colors.red}[error]${colors.reset}`)
        .replaceAll('[success]', `${colors.green}[success]${colors.reset}`);

    let messageWithNoColors = messageToLog;
    for (const color of Object.values(colors)) {
        messageWithNoColors = messageWithNoColors.replaceAll(color, '');
    }

    if (config.noColors === true) messageToLog = messageWithNoColors;

    if (config.saveLogs === true) {
        if (!fs.existsSync(`${dataFolder}/logs.json`)) {
            fs.writeFileSync(
                `${dataFolder}/logs.json`,
                JSON.stringify({ logs: [{ message: messageWithNoColors, date: new Date() }] }, null, 4)
            );
        } else {
            const currentLogs = require(`${dataFolder}/logs.json`);
            currentLogs.logs.unshift({ message: messageWithNoColors, date: new Date() });
            fs.writeFileSync(`${dataFolder}/logs.json`, JSON.stringify(currentLogs, null, 4));
        }
    }

    if (clearLastLine === true) {
        process.stdout.write('\r\x1b[K');
        process.stdout.write(messageToLog);
        breakNextLine = true;
    } else {
        if (breakNextLine === true) messageToLog = `\n${messageToLog}`;
        console.log(messageToLog);
        breakNextLine = false;
    }

    return;
}

////////////// Main

// Load modules.
modules['data'] = require('./modules/data.js');
modules['file-explorer'] = require('./modules/file-explorer.js');

// Check if the user is using an unrecommended version of Node.
// Display and error if they are.
if (Number(process.versions.node.split('.')[0]) < 18) {
    log(
        '[warn] You are using a version of Node.js that is older then version 18. Some features may be unstable or not work at all.'
    );
}

// Check if the user provided a command before doing anything else.
if (command === undefined) {
    log('[info] Please run "sxcu help" for more info.');
    return;
}

// Load commands.
for (const commandFile of fs.readdirSync(`${__dirname}/commands/`)) {
    const commandData = require(`${__dirname}/commands/${commandFile}`);
    commands[commandData.name] = commandData;
    commandData.aliases.forEach(function (name) {
        commands[name] = commandData;
    });
}

// Check if the command the user is trying to run exists.
// If it does not, they are given an error.
// However, if the command does exist, it gets executed with the needed information.
if (commands[command] !== undefined) {
    const chosenCommand = commands[command];
    chosenCommand.run({
        arguments: arguments,
        log: log,
        colors: colors,
        commands: commands,
        modules: modules,
    });
} else {
    log(`[error] Command "${command}" does not exist. For a list of commands, please run "sxcu help".`);
}
