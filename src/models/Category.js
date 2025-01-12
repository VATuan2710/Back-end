import mongoose, { Schema } from "mongoose";
import slugMiddleware from "../middlewares/slugMiddlewares.js";

const categorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
    },
    slug: {
      type: String,
      //   required: true,
    },
    isHidden: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

categorySchema.plugin(slugMiddleware("title", "slug"));

const Category = mongoose.model("Category", categorySchema);

export default Category;
