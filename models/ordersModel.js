import mongoose from "mongoose";


const OrdersSchema = new mongoose.Schema(
    {
        productscount: {
            type: Number,
            default:0,
            required: true
        },
        equipmentforhire: {
            type: Number,
            default:0,
            required: true
        },
        equipmentforsale: {
            type: Number,
            default:0,
            required: true
        },
        potentials: {
            type: Number,
            default:0,
            required: true
        },
        totalusers: {
            type: Number,
            default:0,
            required: true
        },         
        storages: {
            type: Number,
            default:0,
            required: true
        },
        vegetables: {
            type: Number,
            default:0,
            required: true
        },
        fruits: {
            type: Number,
            default:0,
            required: true
        },
        foodgrainsandcereals: {
            type: Number,
            default:0,
            required: true
        },
        spices: {
            type: Number,
            default:0,
            required: true
        },
    }, { timestamps: true });



export default mongoose.model('orders', OrdersSchema);