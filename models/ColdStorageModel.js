import mongoose from "mongoose";

const coldSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
        },
        
        phone: {
            type: String,
        },
        address: {
            type: String,
        },
        pincode: {
            type: Number,
        },
        description: {
            type: String,
        },
        rating: {
            type: Number,
            default: 0
        },
        links: {
            type: String,
            default: "https://www.google.com"
        },
        license: {
            type: String,
            unique: true
        },
        owner: {
            type: String,
        },
        capacity:{
            type:String
        }
    },
    { timestamps: true }
);

export default mongoose.model("coldstorages", coldSchema);
