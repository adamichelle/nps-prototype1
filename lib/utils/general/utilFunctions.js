const bcryptjs = require('bcryptjs');

const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

const hashPasswordFunction = async (plainPassword) => {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(plainPassword, salt);
    return hashedPassword;
}

const comparePassword = async (plainPassword, hashedPassword) => {
    const validPassword = bcryptjs.compare(plainPassword, hashedPassword);
    return validPassword;
}

const generateRandomPassword = (length) => {
    let result = ' ';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

module.exports.hashPasswordFunction = hashPasswordFunction;
module.exports.comparePassword = comparePassword;
module.exports.generateRandomPassword = generateRandomPassword;