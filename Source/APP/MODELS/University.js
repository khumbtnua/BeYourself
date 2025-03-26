const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const University = new Schema(
  { Name: { type: String },
    Intro: { type: String },
    News: { type: String },
    Info: { type: String },
    Curr: { type: String },
    Field: { type: String },
    slug: { type: String },
    img: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  { versionKey: false },
  {
    collection: "universities",
  }
);

module.exports = mongoose.model("University", University);
