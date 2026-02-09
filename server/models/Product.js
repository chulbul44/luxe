const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    originalPrice: {
        type: Number,
    },
    discount: {
        type: String,
    },
    tag: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", ProductSchema);
