"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    brand: {
        type: String,
        required: true,
        trim: true,
    },
    model: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: String,
        required: true,
        trim: true,
    },
    currency: {
        type: String,
        required: true,
        trim: true,
    },
    movement: {
        type: String,
        required: true,
        trim: true,
    },
    case_material: {
        type: String,
        required: true,
        trim: true,
    },
    case_diameter: {
        type: String,
        required: true,
        trim: true,
    },
    case_thickness: {
        type: String,
        required: true,
        trim: true,
    },
    strap_width: {
        type: String,
        required: true,
        trim: true,
    },
    strap_material: {
        type: String,
        required: true,
        trim: true,
    },
    user: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
    water_resistance: {
        type: String,
        required: true,
        trim: true,
    },
    functions: {
        type: [String],
        required: true,
        trim: true,
    },
    features: {
        type: [String],
        required: true,
        trim: true,
    },
    color_options: {
        type: [String],
        required: true,
        trim: true,
    },
    availability: {
        type: Boolean,
        required: true,
        trim: true,
    },
    ratings: {
        type: Object,
        trim: true,
    },
    quantity: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    image_url: {
        type: String,
        trim: true,
    },
    catagories: {
        type: String,
        required: true,
        trim: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Products = (0, mongoose_1.model)("Products", productSchema);
