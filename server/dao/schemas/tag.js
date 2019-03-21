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
    description: String,
    type: String,
    sort: Number,
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
        return this.find({}, { _id: 0, by: 0 }).sort({ id: -1 });
    },
    findById: function (id) {
        return this.findOne({ id });
    },
    removeById: async function (id) {
        return this.remove({ id });
    },
    updateInclude: async function (condition, data) {
        return this.update(condition, { $set: data });
    }
};

export default TagSchema;
