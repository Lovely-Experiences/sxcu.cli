#! /usr/bin/env node

////////////// Variables

const fs = require('fs');
const arguments = process.argv.slice(2);
const command = arguments[0];
const commands = {};
const colors = { reset: '\u001b[0m', red: '\u001b[31m', blue: '\u001b[34m', yellow: '\u001b[33m', green: '\u001b[32m' };

////////////// Methods

function log(message) {
    console.log(
        message
            .replaceAll('[info]', `${colors.blue}[info]${colors.reset}`)
            .replaceAll('[warn]', `${colors.yellow}[warn]${colors.reset}`)
            .replaceAll('[error]', `${colors.red}[error]${colors.reset}`)
            .replaceAll('[success]', `${colors.green}[success]${colors.reset}`)
    );
    return;
}

////////////// Main

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
    });
} else {
    log(`[error] Command "${command}" does not exist. For a list of commands, please run "sxcu help".`);
}
