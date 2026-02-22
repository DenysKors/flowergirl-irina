import mongoose from "mongoose";

const SuppliesCategories = mongoose.Schema({
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
export default mongoose.models.SuppliesCategories ||
  mongoose.model("SuppliesCategories", SuppliesCategories);
