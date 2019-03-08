import Bcrypt from 'bcrypt';

export const encrypt = async function (password) {
    let salt = await Bcrypt.genSaltSync(10);
    return Bcrypt.hashSync(password, salt);
};

export const validate = async function (password, hash) {
    return Bcrypt.compareSync(password, hash);
};
