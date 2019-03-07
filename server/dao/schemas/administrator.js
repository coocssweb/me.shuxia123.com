import Mongoose from 'mongoose';
import { ObjectID } from 'mongodb';
import {validate, encrypt} from '../../utils/encryption';

// 定义模式
let AdministratorSchema = new Mongoose.Schema({
    administrator: {
        type: String,
        unique: true,
        require: true,
    },
    password: String,
    nickname: String,
    avatar: String,
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
AdministratorSchema.pre('save', async function(next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await encrypt(this.password);
    }

    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }

    next();
});

// 方法
AdministratorSchema.methods = {
    comparePassword: async function (password) {
        return await validate(password, this.password);
    }
};

// 静态查询方法
AdministratorSchema.statics = {
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
    findByName: async function(name, checkPassword = false) {
        let options = {
            meta: 0
        };

        if (!checkPassword) {
            options.password = 0;
        }
        return await this.findOne({ administrator: name }, options);
    },
    findById: function (id) {
        return this.findOne(
            {
                _id: ObjectID(id)
            },
            {
                password: 0,
                meta: 0
            });
    },
    removeById: async function(id) {
        return this.remove({ _id: ObjectID(id) });
    },
    updateInclude: async function ({ condition, data }) {
        let filterCondition = Object.assign({}, condition);
        if (condition.id) {
            filterCondition._id = ObjectID(filterCondition.id);
        }
        return this.update(filterCondition, { $set: data});
    }
};

export default AdministratorSchema;