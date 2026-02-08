import mongoose from "mongoose";

const PlantsCategories = mongoose.Schema({
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
export default mongoose.models.PlantsCategories ||
  mongoose.model("PlantsCategories", PlantsCategories);
