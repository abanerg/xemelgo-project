const bcrypt = require("bcryptjs");

async function hashPassword(password) {
    const hashed = await bcrypt.hash(password, 10);
    return hashed; 
}

async function comparePasswords(plaintext, hash) {
    const ret = await bcrypt.compare(plaintext, hash);
    return ret; 
}

module.exports = {
    hashPassword,
    comparePasswords
}