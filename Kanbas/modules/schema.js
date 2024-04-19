import mongoose from "mongoose";

const lessonSchema = new mongoose.Schema({
  id: String,
  name: String,
  description: String,
  module: String,
});

const moduleSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    course: { type: String },
    description: { type: String },
    lessons: { type: [lessonSchema], default: [] },
  },
  { collection: "modules" }
);
export default moduleSchema;
