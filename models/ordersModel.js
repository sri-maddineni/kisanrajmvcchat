import mongoose from "mongoose";


const OrdersSchema = new mongoose.Schema(
    {
        status: {
            type: String,
            default:0,
            required: true
        },
        location: {
            type: String,
            default:0,
            required: true
        },
        
      
    }, { timestamps: true });



export default mongoose.model('orders', OrdersSchema);