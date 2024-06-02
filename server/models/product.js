import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    countInStock: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    colors: {
        type: [String], // Add the colors field as an array of strings
        default: [],    // Default to an empty array if no colors are provided
    },
},
    {
        timestamps: true,
    });

const Product = mongoose.model("Product", productSchema);

export default Product;