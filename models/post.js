import { model, models, Schema } from "mongoose";
import User from "./user";

const PostSchema = new Schema({
  prompt: { type: String, required: [true, "Prompt is required."] },
  creator: { type: Schema.Types.ObjectId, ref: User },
  tag: { type: String, required: [true, "Tag is required."] },
});

const Prompt = models.Prompt || model("Prompt", PostSchema);

export default Prompt;
