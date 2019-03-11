import Mongoose from 'mongoose';
import autoIncrementId from '../autoIncrementId';

// 定义模式
let ArticleSchema = new Mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    tagId: Number,
    title: String,
    keyword: String,
    description: String,
    posters: [String],
    status: Number,
    likeCount: Number,
    children: [
        {
            id: {
                type: Number,
                unique: true
            },
            posters: [String],
            title: String,
            description: String,
            content: String,
            likeCount: Number,
            createAt: {
                type: Number,
                default: Date.now()
            },
            updateAt: {
                type: Number,
                default: Date.now()
            }
        }
    ],
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
        this.likeCount = 0;
        this.children = [];
        this.id = await autoIncrementId('article');
    } else {
        this.updateAt = Date.now();
    }

    next();
});

// 方法
ArticleSchema.methods = {
    // 插入子文章
    pushChildren: async function (childData) {
        childData.createAt = childData.updateAt = Date.now();
        childData.likeCount = 0;
        childData.id = await autoIncrementId('articleChildren');
        let result = {};
        await this.update({ $push: { children: childData } }).then((response) => {
            result = childData;
        }); 
        return result;
    },
    // 修改子文章
    editChildren: async function (id, updateData) {
        let result = {};
        for (let index = 0; index < this.children.length; index++) {
            if (this.children[index].id == id) {
                result = this.children[index] = {...updateData , id: this.children[index].id };
                break;
            }
        }

        await this.save();
        return result;
    },
    // 删除子文章
    removeChildren: async function (childId) {
        return await this.update({ $pull: { children: { id: childId } } });
    }
};

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