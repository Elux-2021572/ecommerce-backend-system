import { Schema, model } from "mongoose";
import Product from "../product/product.model.js";

const billSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User', 
            required: true,
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product', 
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1, 
                },
            },
        ],
        subTotal: {
            type: Number,
            default: 0, 
        },
    },
    {
        timestamps: true, 
        versionKey: false, 
    }
);

billSchema.methods.calculateTotal = async function () {
    let total = 0;
    for (const item of this.products) {
        const product = await Product.findById(item.product);
        if (product) {
            total += product.price * item.quantity;
        }
    }
    this.subTotal = total;
};


export default model("Bill", billSchema);