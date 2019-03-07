import Mongoose from "mongoose";

const counterSchema = new Mongoose.Schema({
    key: {
        type: String,
        unique: true
    },
    value: Number
});

const Counter = Mongoose.model('counter', counterSchema);

export default async (key) => {
    let counter = await Counter.findOne({ key: key }).exec();
    if (counter) {
        await counter.update({
            value: counter.value + 1
        });
    } else {
        let counter = new Counter({
            key: key,
            value: 1
        });

        await counter.save();
    }
    return counter.value
};
