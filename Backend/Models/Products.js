const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); //  UUID library for generating unique IDs

const ProductSchema = new mongoose.Schema(
    {
        ProductName: {
            type: String,
            required: true,
        },
        ProductPrice: {
            type: Number,
            required: true,
        },
        ProductBarcode: {
            type: String,
            default: function(){
                return uuidv4();    //  Generate a unique UUID for ProductCode
            }
        },
        DateAdded: {
            type: Date,
            default: Date.now
        }
    });

const Products = mongoose.model("Products", ProductSchema)
module.exports = Products;
