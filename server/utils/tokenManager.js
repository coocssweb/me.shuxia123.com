// 获取当前Token
export const getToken = (headers) => {
    if (headers && headers.authorization) {
        const authorization = headers.authorization;
        const part = authorization.split(' ');

        return part.length === 2 ? part[1] : null;
    } else {
        return null;
    }
};

// 中间件验证
export const verifyToken = async (ctx, next) => {
    const token = getToken(ctx.request.headers);
    // 做redis验证
    // await redisClient.getAsync(token).then((reply, err) => {
    //     if (err) {
    //         return ctx.response.status = 500;
    //     }

    //     if (reply) {
    //         return ctx.response.status = 401;
    //     }
    //     return next();
    // });
};

// 强制token过期
export const expireToken = (ctx) => {
    const token = getToken(ctx.request.headers);
    if (token !== null) {
        // todo，redis做主动退出
        // redisClient.set(token, JSON.stringify({ is_expired: true }));
        // redisClient.expire(token, TOKEN_EXPIRATION_SEC);
    }
};
