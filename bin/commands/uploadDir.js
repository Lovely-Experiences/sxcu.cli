module.exports = {
    name: 'uploadDir',
    aliases: [],
    description: 'Upload a directory of files/images to sxcu.net.',
    usage: 'sxcu upload <directory> [self destruct: true/false]',
    run: async function (data) {
        const sxcu = require('sxcu.api');
        const fs = require('fs');
        const directory = data.arguments[1];
        const selfDestruct = data.arguments[2];
        if (directory !== undefined) {
            const fileExists = fs.existsSync(directory);
            if (fileExists === true) {
                let shouldDestroy = false;
                if (selfDestruct === 'true') shouldDestroy = true;
                const files = [];
                for (const file of fs.readdirSync(directory)) {
                    if (fs.lstatSync(`${directory}/${file}`).isDirectory() === false) {
                        files.push(`${directory}/${file}`);
                    }
                }
                if (files.length === 0) {
                    data.log('[error] There are no files to upload.');
                    return;
                }
                data.log(`[info] Attempting to upload ${files.length} files in the directory "${directory}".`);
                data.log(`[info] Use "ctrl + c" to cancel and end the process at any time.`);
                if (files.length > 4) {
                    const estimatedTime = Math.round(files.length / 4);
                    data.log(
                        `[warn] Uploading more then 4 files may take multiple minutes. (Estimated Time: ~${estimatedTime}mins)`
                    );
                }
                data.log('[info] Starting upload in 4 seconds...');
                await new Promise((resolve) => setTimeout(resolve, 4000));
                const links = [];
                let count = 0;
                for (const file of files) {
                    await sxcu.utility.getRateLimitPromise('uploadFile');
                    count++;
                    let error = false;
                    const result = await sxcu.files
                        .uploadFile(file, { selfDestruct: shouldDestroy })
                        .catch(function (err) {
                            error = sxcu.utility.resolveError(err).error;
                        });
                    if (error === false) {
                        links.push({ file: file, url: result.url });
                        data.log(`[success] [${count}/${files.length}] Uploaded "${file}" successfully.`);
                    } else {
                        data.log(`[error] [${count}/${files.length}] Failed to upload "${file}". ${error}`);
                    }
                }
                if (links.length === 0) {
                    data.log('[error] Unable to upload any files in the directory provided.');
                } else {
                    const newFileName = `output-${new Date().getTime()}.json`;
                    fs.writeFile(newFileName, JSON.stringify({ output: links }), function (error) {
                        if (error) {
                            data.log(`[error] Failed to save output to file, dumping to console...`);
                            for (const link of links) {
                                data.log(`[info] URL for file "${link.file}" is ${link.url}.`);
                            }
                        } else {
                            data.log(`[success] Result/links can be found in "./${newFileName}."`);
                        }
                    });
                }
            } else {
                data.log(`[error] The directory "${directory}" does not exist on the current directory.`);
            }
        } else {
            data.log(
                '[error] Please provide the directory of where the files are located that you want to upload.\n[info] Run "sxcu help uploadDir" for more info.'
            );
        }
        return;
    },
};
