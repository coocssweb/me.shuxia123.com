import Mongoose from "Mongoose";
import autoIncrementId from "../autoIncrementId";

let BestwishSchema = new Mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
    },
    description: String,
    enable: Number,
    mediaCode: String,
    statsCode: String,
    createAt: {
      type: Number,
      default: Date.now(),
    },
    updateAt: {
      type: Number,
      default: Date.now(),
    },
  },
  {
    versionKey: false,
  }
);

BestwishSchema.pre("save", async function (next) {
  if (this.isNew) {
    this.createAt = this.updateAt = Date.now();
    this.id = await autoIncrementId("bestwish");
  } else {
    this.updateAt = Date.now();
  }

  next();
});

BestwishSchema.statics = {
  fetchAll: function (query, page = 1, size = 10) {
    const skip = (page - 1) * size;
    return this.find(
      {
        ...query,
      },
      { _id: 0, by: 0 }
    )
      .skip(skip)
      .limit(parseInt(size))
      .sort({ id: -1 });
  },
  removeById: async function (id) {
    return this.remove({ id });
  },
  updateInclude: async function (condition, data) {
    return this.update(condition, { $set: data });
  },
};

export default BestwishSchema;
