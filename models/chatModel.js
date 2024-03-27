import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema({
    //{pid,sentBy,sellerId,quantity,price,notes,date}
    pid: {
        type: mongoose.ObjectId,
        ref: "products",
        required: true,
    },
    sentBy: {
        type: mongoose.ObjectId,
        ref: "users",
        required: true,
    },
    sellerId: {
        type: mongoose.ObjectId,
        ref: "users",
        required: true,
    },
    toId: {
        type: mongoose.ObjectId,
        ref: "users",
        required: true,
    },
    quantity: {
        type: String,
        
    },
    price: {
        type: Number,
        
    },
    notes: {
        type: String,
        
    },
    date: {
        type: Date,
        
    },

}, { timestamps: true })

export default mongoose.model('chats', ChatSchema);