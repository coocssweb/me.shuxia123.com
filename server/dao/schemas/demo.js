import Mongoose from 'Mongoose';
import autoIncrementId from '../autoIncrementId';

let DemoSchema = new Mongoose.Schema({
    id: {
        type: Number,
        unique: true
    },
    name: String,
    path: String,
    description: String,
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

DemoSchema.pre('save', async function (next) {
    if (this.isNew) {
        this.createAt = this.updateAt = Date.now();
        this.id = await autoIncrementId('demo');
    } else {
        this.updateAt = Date.now();
    }

    next();
});

DemoSchema.statics = {
    fetch: function () {
        return this.find({}, { _id: 0, by: 0 }).sort({ id: -1 });
    },
    removeById: async function (id) {
        return this.remove({ id });
    },
    updateInclude: async function (condition, data) {
        return this.update(condition, { $set: data });
    }
};

export default DemoSchema;
