import Bcrypt from 'bcrypt';

const encrypt = async function (password) {
    let salt = await Bcrypt.genSaltAsync(10);
    return await Bcrypt.hashAsync(password, salt);
};

const validate = async function (password, hash) {
    return await Bcrypt.compareAsync(password, hash);
};
