import errorCode from '../../const/errorCode';
import AdministratorModel from '../../dao/models/administrator';
import JWT from  'jsonwebtoken';
import { ADMINISTRATOR_TOKEN_SECRET_KEY } from '../../const';
import * as TokenManager from '../../utils/tokenManager';

const fetchOne = async (ctx, next) => {
    const { id } = ctx.params;
    const result = await AdministratorModel.findById(id);
    if (result) {
        ctx.body = ctx.bodyFormatter(undefined, result);
    } else {
        ctx.body = ctx.bodyFormatter(errorCode.DATA_NOT_FOUND);
    }
};

const create = async (ctx, next) => {
    const requestData = ctx.request.body;
    const administrator = new AdministratorModel(requestData);
    await new Promise((resolve, reject) => {
        administrator.save(error => {
            error ? reject(error) : resolve(administrator)
        });
    }).then((response) => {
        ctx.body = ctx.bodyFormatter(undefined, response);
    }, (error) => {
        ctx.body = ctx.bodyFormatter({ ...errorCode.CREATE_ERROR, desc: JSON.stringify(error) });
    }).catch((error) => {
        console.log(error);
    });
};

const edit = async (ctx, next) => {
    const requestData = ctx.request.body;
    const { id } = ctx.params;
    await AdministratorModel.updateInclude({ id: parseInt(id) }, requestData).then((response) => {
        ctx.body = ctx.bodyFormatter(undefined);
    }, (error) => {
        ctx.body = ctx.bodyFormatter({ ...errorCode.EDIT_ERROR, desc: JSON.stringify(error) });
    });
};

const login = async (ctx, next) => {
    let { name, password}  = ctx.request.body;
    let administrator = await AdministratorModel.findByName(name, true);

    if (administrator) {
        if (await administrator.comparePassword(password)) {
            let access_token = JWT.sign(
                { name: administrator.name }
                , ADMINISTRATOR_TOKEN_SECRET_KEY
                , { expiresIn: 60 * 60 }
            );
            ctx.body = ctx.bodyFormatter(undefined, { access_token });
        } else {
            ctx.body = ctx.bodyFormatter(errorCode.PASSWORD_ERROR);
        }
    } else {
        ctx.body = ctx.bodyFormatter(errorCode.NAME_ERROR);
    }
};

const logout = async (ctx, next) => {
    TokenManager.expireToken(ctx);
    ctx.body = ctx.bodyFormatter();
};

export default {
    fetchOne,
    create,
    edit,
    login,
    logout
};
