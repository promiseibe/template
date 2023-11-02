const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Input a name"],
        trim: true
    },
    sku: {
        type: String,
        required: true,
        default: "SKU",
        trim: true
    },
    category: {
        type: String,
        required: [true, "Please input a category"],
        trim: true,      
    },
    brand : {
        type: String,
        required: [true, "Please add a brand"],
        trim: true,
        
    },
    color: {
        type: String,
        required: [true, "Please add a color"],
        default: "As seen",
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, "Please add a color"],
        trim: true,
    },
    sold: {
        type: Number,
        default: 0,
        trim: true,
    },
    regularPrice: {
        type: Number,
        // required: [true, "Please add a color"],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, "Please add a Price"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
        trim: true,
    },
    image: {
        type: [String],
    },
    ratings: {
        type: [Object],
    },
}, 
{
    timestamps: true
})

const Product = new mongoose.model("product", productSchema)
module.exports = Product