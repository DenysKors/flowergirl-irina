import mongoose from "mongoose";

import { SELL_STATUS_ENUMS } from "../constants/enums";

const Plant = mongoose.Schema(
  {
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: [
        {
          label: String,
          value: String,
        },
      ],
      required: true,
    },
    imagesUrl: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      min: [0, "Must be 0 or greater"],
      required: true,
    },
    qty: {
      type: Number,
      min: [0, "Must be 0 or greater"],
      required: true,
    },
    sell_status: {
      type: String,
      enum: Object.values(SELL_STATUS_ENUMS),
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.models.Plant || mongoose.model("Plant", Plant);
