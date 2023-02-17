module.exports = {
    name: 'help',
    aliases: ['-h'],
    description: 'Get a list of commands or information about a specific command.',
    usage: 'sxcu help [command]',
    run: function (data) {
        const command = data.arguments[1];
        if (command !== undefined) {
            const commandData = data.commands[command];
            if (commandData !== undefined) {
                data.log(
                    `[info] Showing information about the command "${command}".
[info] ${data.colors.yellow}Name:${data.colors.reset} ${commandData.name}
[info] ${data.colors.yellow}Description:${data.colors.reset} ${commandData.description}
[info] ${data.colors.yellow}Aliases:${data.colors.reset} ${commandData.aliases.join(', ')}
[info] ${data.colors.yellow}Usage:${data.colors.reset} ${commandData.usage}`
                );
            } else {
                data.log(
                    `[error] Command "${command}" does not exist.\n[info] For a list of commands, please run "sxcu help".`
                );
            }
        } else {
            const commandList = Object.keys(data.commands).join(', ');
            data.log(
                `[info] sxcu.cli allows you to interact with the sxcu.net API in the command line.\n[info] ${data.colors.yellow}Commands:${data.colors.reset} ${commandList}\n[info] For more info on a specific command, please run "sxcu help <command>".`
            );
        }
    },
};
