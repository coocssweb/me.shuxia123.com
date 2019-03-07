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
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
}, {
    versionKey: false
});

// 新增之前的中间件
ArticleSchema.pre('save', async function(next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
        this.id = await autoIncrementId('article');
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

// 静态查询方法
ArticleSchema.statics = {
    fetch: function (query, name, skip, limit) {
        return this.find(
            {
                ...query,
                administrator: { $ne: name }
            },
            {
                password: 0
            }).skip(skip).limit(parseInt(limit)).sort('meta.updateAt');
    },
    findById: function (id) {
        return this.findOne(
            {
                id
            },
            {
                password: 0,
                meta: 0
            });
    },
    removeById: async function(id) {
        return this.remove({ id });
    },
    updateInclude: async function ({ condition, data }) {
        return this.update(condition, { $set: data});
    }
};

export default AdministratorSchema;