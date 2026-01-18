import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    images: [
      {
        type: String,
        required: [true, "Image is required"],
      },
    ],
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
    category: {
      type: String,
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    sizes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
