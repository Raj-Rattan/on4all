const mongoose = require('mongoose');

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    productCategory: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    sold: {
        type: Number,
        default: 0
    },
    images: [
        {
            public_id: String,
            url: String
        }
    ],
    color: [
        // {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Color"
        // }
    ],
    tags: String,
    ratings: [
        {
            star: Number,
            comment: String,
            postedBy: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    totalRatings: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

//Export the model
module.exports = mongoose.model('Product', productSchema);