import mongoose from "mongoose";
import { Schema } from "mongoose";

const orderSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    total: { type: Number, required: true },
    status: { type: String, required: true, default: 'Pending' },
    cartItems: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
            name: { type: String, required: true },
            price: { type: Number, required: true },
            quantity: { type: Number, required: true },
        },
    ],
},
    {
        timestamps: true,
    })



const Order = mongoose.model('Order', orderSchema);
export default Order;