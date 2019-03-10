import fs from 'fs';
import path from 'path';
import errorCode from '../../const/errorCode';

const upload = async (ctx, next) => {
    try {
        const file = ctx.request.files.files;
        const reader = fs.createReadStream(file.path);
        const date = new Date();
        const fileName = `${Date.now()}.${file.name.split('.')[1]}`;
        const fileDir =  `/uploads/${date.getFullYear()}/`;
        const filePath = path.join(__dirname, '../../../dist/', fileDir);
        if (!fs.existsSync(filePath)) {
            console.log('sss', filePath);
            fs.mkdirSync(filePath);
        }
        console.log('sssssss');
        const upStream = fs.createWriteStream(`${filePath}${fileName}`);
        reader.pipe(upStream);
        ctx.body = ctx.bodyFormatter(undefined, {filename: `${fileDir}${fileName}`});
    } catch (e) {
        console.log(e);
        ctx.body = ctx.bodyFormatter({ ...errorCode.UPLOAD_ERROR, desc: JSON.stringify(e) });
    }
};

const getTimeCurrent = async (ctx, next) => {
    ctx.body = ctx.bodyFormatter(undefined, { timestamp: Date.now() });
};

export default {
    upload,
    getTimeCurrent
};
