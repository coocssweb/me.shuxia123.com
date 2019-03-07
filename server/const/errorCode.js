/**
 * 错误信息码
 * Created by 王佳欣 on 2018/4/28.
 */

const DATA_NOT_FOUND = {
    code: 6005,
    msg: 'No found'
};

const CREATE_ERROR = {
    code: 6001,
    msg: 'Incorrect create.'
};

const EDIT_ERROR = {
    code: 6002,
    msg: 'Incorrect update.'
};

const REMOVE_ERROR = {
    code: 6003,
    msg: 'Incorrect remove.'
};

const EXIST_ERROR = {
    code: 6004,
    msg: 'Resources already exists'
};

const PARAMETER_ERROR = {
    code: 7000,
    msg: 'Incorrect parameter'
};

const TOKEN_ERROR = {
    code: 7001,
    msg: 'Incorrect token'
};

const PASSWORD_ERROR = {
    code: 7002,
    msg: 'Incorrect password'
};

const NAME_ERROR = {
    code: 7003,
    msg: 'Incorrect name'
};

export default {
    CREATE_ERROR,
    EDIT_ERROR,
    REMOVE_ERROR,
    TOKEN_ERROR,
    EXIST_ERROR,
    DATA_NOT_FOUND,
    PASSWORD_ERROR,
    NAME_ERROR,
    PARAMETER_ERROR,
};
