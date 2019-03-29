import fs from 'fs';
import path from 'path';
import images from 'images';
import errorCode from '../../const/errorCode';
import Config from '../../config';

const upload = async (ctx, next) => {
    try {
        const file = ctx.request.files.files;
        const reader = fs.createReadStream(file.path);

        const extName = file.name.split('.')[1];
        const fileName = `${Date.now()}`;
        const fileDir = `/uploads/${(new Date()).getFullYear()}/`;
        const filePath = path.join(__dirname, '../../../dist/', fileDir);
        if (!fs.existsSync(filePath)) {
            fs.mkdirSync(filePath);
        }
        const upStream = fs.createWriteStream(`${filePath}${fileName}.${extName}`);
        reader.pipe(upStream);

        let renameFunc = async () => {
            const name = new Promise((resolve, reject) => {
                // 监听文件流close，进行文件压缩，重命名
                reader.on('close', function () {
                    const newFile = images(`${filePath}${fileName}.${extName}`);
                    const width = newFile.width();
                    const height = newFile.height();
                    const newFileName = `${fileName}_width_${width}_height_${height}`;
                    fs.renameSync(`${filePath}${fileName}.${extName}`, `${filePath}${newFileName}.${extName}`);
                    // 压缩图片，存储预览图
                    newFile
                        .size(40)
                        .save(`${filePath}${newFileName}_preview.${extName}`, { quality: 100 });
                    resolve(newFileName);
                });
            });
            return name;
        };

        let newFileName = await renameFunc();
        ctx.body = ctx.bodyFormatter(undefined, { filename: `${Config.assets}${fileDir}${newFileName}.${extName}` });
    } catch (e) {
        console.log(e);
        ctx.body = ctx.bodyFormatter({ ...errorCode.UPLOAD_ERROR, desc: JSON.stringify(e) });
    }
};

// const rename = async (ctx, next) => {
//     const filePath = path.join(__dirname, '../../../dist/uploads/2019/');
//     const newFile = images(`${filePath}1553153599680.jpg`);
//     const width = newFile.width();
//     const height = newFile.height();
//     const fileName = '1553153599680';
//     const newFileName = `${fileName}_width_${width}_height${height}`;
//     console.log('1234');
//     try {
//         await fs.rename(`${filePath}${fileName}.jpg`, `${filePath}${newFileName}.jpg`, (err) => {
//             console.log(err);
//         });
//     } catch (e) {
//         console.log(e);
//     }
    
//     console.log('1234');
//     // 压缩图片，存储预览图
//     newFile
//         .size(20)
//         .save(`${filePath}${newFileName}_preview.jpg`, { quality: 50 });
// };

const getTimeCurrent = async (ctx, next) => {
    ctx.body = ctx.bodyFormatter(undefined, { timestamp: Date.now() });
};

export default {
    upload,
    // rename,
    getTimeCurrent
};
