#! /usr/bin/env node

const Command = process.argv[2];

if (Command === undefined) {
    console.log("[info] Please run 'sxcu --help' for a list of commands.");
} else if (Command === '--help') {
    console.log('[info] Coming soon...');
} else {
    console.log(`[warn] Command '${Command}' not found.`);
}
