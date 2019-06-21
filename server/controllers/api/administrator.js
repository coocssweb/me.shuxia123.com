import errorCode from '../../const/errorCode';
import AdministratorModel from '../../dao/models/administrator';
import JWT from  'jsonwebtoken';
import { getToken } from '../../utils/tokenManager';
import { ADMINISTRATOR_TOKEN_SECRET_KEY } from '../../const';
import * as TokenManager from '../../utils/tokenManager';

const fetchOne = async (ctx, next) => {
    let token = getToken(ctx.request.headers);
    await JWT.verify(token, ADMINISTRATOR_TOKEN_SECRET_KEY, (error, decoded) => {
        if (error) {
            return ctx.body = ctx.bodyFormatter({...errorCode.TOKEN_ERROR});
        }
        return AdministratorModel.findByName(decoded.name).then((result) => {
            if (!result) {
                return ctx.body = ctx.bodyFormatter({...errorCode.TOKEN_ERROR});
            }
            ctx.body = ctx.bodyFormatter(undefined, result);
        }).catch((error) => {
            ctx.body = ctx.bodyFormatter({...errorCode.TOKEN_ERROR});
        });
    });
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
    let { name, password } = ctx.request.body;
    let administrator = await AdministratorModel.findByName(name, true);

    if (administrator) {
        if (await administrator.comparePassword(password)) {
            let access_token = JWT.sign(
                { name: administrator.name }
                , ADMINISTRATOR_TOKEN_SECRET_KEY
                , { expiresIn: 60 * 60 * 24 }
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
