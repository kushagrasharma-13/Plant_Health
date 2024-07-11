import mongoose, { Schema } from "mongoose";

const searchSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "Users",
  },
  crop_name: {
    type: String,
    trim: true,
    required: true,
  },
  disease: {
    type: String,
    trin: true,
    required: true,
  },
  supplement: {
    type: String,
    trim: true,
    required: true,
  },
});

const History = mongoose.model("History", searchSchema);

export default History;
