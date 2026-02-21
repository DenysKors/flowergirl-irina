import mongoose from "mongoose";

const ProtectionCategories = mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  value: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
});
export default mongoose.models.ProtectionCategories ||
  mongoose.model("ProtectionCategories", ProtectionCategories);
