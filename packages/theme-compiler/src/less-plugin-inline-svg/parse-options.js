module.exports = function parseOptions(options) {
    const result = {};

    if (typeof options === 'string') {
        const optionArgs = options.split(' ');

        for (let i = 0; i < optionArgs.length; i++) {
            const argSplit = optionArgs[i].split('=');
            const argName = argSplit[0].replace(/^-+/, '');
            const value = argSplit[1];

            switch(argName) {
                case 'encode':
                case 'base64':
                    result[argName] = Boolean(value.toLocaleLowerCase() === 'true');
                break;

                default:
                    throw new Error(`Unrecognised npm-import option "${argSplit[0]}"`);
            }
        }
    }

    return result;
};
