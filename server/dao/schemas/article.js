import Mongoose from 'mongoose';
import autoIncrementId from '../autoIncrementId';

// 定义模式
let ArticleSchema = new Mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    title: String,
    keyword: String,
    description: String,
    content: String,
    poster: String,
    status: Number,
    createAt: {
        type: Number,
        default: Date.now()
    },
    updateAt: {
        type: Number,
        default: Date.now()
    }
}, {
    versionKey: false
});

// 新增之前的中间件
ArticleSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.createAt = this.updateAt = Date.now();
        this.id = await autoIncrementId('article');
    } else {
        this.updateAt = Date.now();
    }

    next();
});

// 静态查询方法
ArticleSchema.statics = {
    fetch: function (query, page = 1, size = 10) {
        const skip = (page - 1) * size;
        const limit = size;
        return this.find(
            {
                ...query
            }).skip(skip).limit(parseInt(limit)).sort('meta.updateAt');
    },
    findById: function (id) {
        return this.findOne({ id });
    },
    removeById: async function(id) {
        return this.remove({ id });
    },
    updateInclude: async function (condition, data) {
        return this.update(condition, { $set: data});
    }
};

export default ArticleSchema;