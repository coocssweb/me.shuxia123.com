import Mongoose from 'Mongoose';
import autoIncrementId from '../autoIncrementId';

let TagSchema = new Mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: String,
    path: String,
    poster: String,
    createAt: {
        type: Number,
        default: Date.now()
    },
    updateAt: {
        type: Number,
        default: Date.now()
    }  
});

TagSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.createAt = this.updateAt = Date.now();
        this.id = await autoIncrementId('tag');
    } else {
        this.updateAt = Date.now();
    }

    next();
});

TagSchema.statics = {
    fetch: function () {
        return this.find();
    },
    findById: function (id) {
        return this.findOne({ id });
    },
    removeById: async function (id) {
        return this.remove({ id });
    },
    updateInclude: async function (condition, data) {
        return this.update(condition, { $set: data});
    }
};

export default TagSchema;
