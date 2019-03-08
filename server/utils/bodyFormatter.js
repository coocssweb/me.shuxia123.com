/**
 * body 结果格式化工具
 * Created by coocss on 2019/3/8.
 */
import ErrorCode from '../const/errorCode';

export default (meta = ErrorCode.SUCCESS_CODE, response = {}) => {
    return JSON.stringify({
        meta,
        response
    });
};
