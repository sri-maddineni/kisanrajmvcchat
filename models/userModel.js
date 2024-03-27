import mongoose from "mongoose";

const ProposalSchema = new mongoose.Schema({
  // Define any fields specific to the proposal if needed
  // For example:
  proposalId: {
    type: mongoose.ObjectId,
    ref: "users",
    required: true
  }
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    pincode:{
      type:Number,
      required:true,
    },
    latitude:{
      type:Number,
      required:true
    },
    longitude:{
      type:Number,
      required:true
    },
    answer: {
      type: String,
      required: true,
    },
    proposalsSent: {
      type: mongoose.Schema.Types.Mixed,
      default:[]
    },
    proposalsReceived: {
      type: Map,
      
      default: new Map()
    },
    role: {
      type: String,
      default: '1', // Assuming role is a string
    },
  },
  { timestamps: true }
);



export default mongoose.model("users", userSchema);
