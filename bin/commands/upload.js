module.exports = {
    name: 'upload',
    aliases: [],
    description: 'Upload a file/image to sxcu.net.',
    usage: 'sxcu upload <file> [self destruct: true/false]',
    run: function (data) {
        const sxcu = require('sxcu.api');
        const fs = require('fs');
        const file = data.arguments[1];
        const selfDestruct = data.arguments[2];
        if (file !== undefined) {
            const fileExists = fs.existsSync(file);
            if (fileExists === true) {
                let shouldDestroy = false;
                if (selfDestruct === 'true') shouldDestroy = true;
                data.log(`[info] Attempting to upload the file "${file}".`);
                sxcu.files
                    .uploadFile(file, { selfDestruct: shouldDestroy })
                    .then(function (result) {
                        data.log(`[success] ${result.url}`);
                    })
                    .catch(function (error) {
                        data.log(`[error] ${sxcu.utility.resolveError(error).error}`);
                    });
            } else {
                data.log(`[error] The file "${file}" does not exist on the current directory.`);
            }
        } else {
            data.log(
                '[error] Please provide the name or the path of the file to upload.\n[info] Run "sxcu help upload" for more info.'
            );
        }
        return;
    },
};
