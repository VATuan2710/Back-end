import mongoose, { Schema } from "mongoose";
import slugMiddleware from "../middlewares/slugMiddlewares.js";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "Updating",
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      // default: "67836a60a83094583683c85e", // unclassified
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true, versionKey: false }
);

productSchema.plugin(slugMiddleware("title", "slug"));
const Product = mongoose.model("Product", productSchema);

export default Product;
