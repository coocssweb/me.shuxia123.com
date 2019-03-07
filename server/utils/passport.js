/**
 * Passport 校验机制
 */
import passport from 'koa-passport';
import { Strategy } from 'passport-http-bearer';
import Administrator from '../dao/models/administrator';
import JWT from  'jsonwebtoken';
import { ADMINISTRATOR_TOKEN_SECRET_KEY } from '../const';
import errorCode from '../const/errorCode';

passport.use('administrator', new Strategy(
    function (token, done) {
        JWT.verify(token, ADMINISTRATOR_TOKEN_SECRET_KEY, (error, decoded) => {
            if (error) {
                return done(null, false, { msg: errorCode.TOKEN_ERROR });
            }

            Administrator.findByName(decoded.name).then((administrator) => {
                if (!administrator) {
                    return  done(null, false, {...errorCode.TOKEN_ERROR});
                }
                return done(null, administrator);
            }).catch((error) => {
                return done(null, false, {...errorCode.TOKEN_ERROR, desc: JSON.stringify(error)});
            });
        });
    }
));
