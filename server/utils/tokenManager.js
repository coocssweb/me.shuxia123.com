/**
 * token 管理类
 * Created by 王佳欣 on 2018/5/2.
 */
import redis from '../config/redis_database';
let redisClient = redis.redisClient;

// 过期时间常量
const TOKEN_EXPIRATION = 60;
const TOKEN_EXPIRATION_SEC = TOKEN_EXPIRATION * 60;

// 获取当前Token
export const getToken = (headers) => {
    if (headers && headers.authorization) {
        let authorization = headers.authorization;
        let part = authorization.split(' ');

        return part.length === 2 ? part[1] : null;
    }
    else {
        return null;
    }
};

// 中间件验证
export const verifyToken = async (ctx, next) => {
    let token = getToken(ctx.request.headers);
    await redisClient.getAsync(token).then((reply, err) => {
        if (err) {
            return ctx.response.status = 500;
        }

        if (reply) {
            return ctx.response.status = 401;
        }
        return next();
    });
};

// 强制token过期
export const expireToken = (ctx) => {
    let token = getToken(ctx.request.headers);
    if (token !== null) {
        redisClient.set(token, JSON.stringify({ is_expired: true }));
        redisClient.expire(token, TOKEN_EXPIRATION_SEC);
    }
};
