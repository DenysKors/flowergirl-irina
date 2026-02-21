import mongoose from "mongoose";

const Protection = mongoose.Schema(
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
  },
  { timestamps: true }
);

Protection.index({ title: "text" });

export default mongoose.models.Protection ||
  mongoose.model("Protection", Protection);

// interface IStoreDB extends IStore, Document {}

//     const storeSchema = new mongoose.Schema({
//         name:{
//             type: String,
//             required:true,
//             index: true
//         },
//         mobile: {
//             type: String,
//             required: false,
//             unique: true,
//             sparse: true,
//             index: true
//         },

//     }, {
//         timestamps: true
//     });

//     storeSchema.index({ name: 'text', mobile: 'text' });

//     const model = createModel<IStoreDB>('Store', storeSchema);

//     export default model;
