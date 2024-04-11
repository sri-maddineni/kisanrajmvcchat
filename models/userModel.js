import mongoose from "mongoose";

const ProposalSchema = new mongoose.Schema({
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
    pincode: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    },
    answer: {
      type: String,
      required: true,
    },
    proposalsSent: {
      type: mongoose.Schema.Types.Mixed,
      default: []
    },
    proposalsSentids: {
      type: Array,
      default: []
    },
    proposalsReceived: {
      type: Map,
      default: new Map()
    },
    role: {
      type: String,
      default: '1', // Assuming role is a string
    },
    chats: {
      type: Array,
      default: []
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }], // Array to store user IDs of followers
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'users' }],
    potentials: [{ type: mongoose.Schema.Types.ObjectId, ref: 'potentials' }],// Array to store user IDs of following
    roles: {
      type: Array,
      default: ["seller", "buyer"]
    },
    rating: {
      type: Number,
      default: 3
    },
    description: {
      type: String,
      default: "Member of KisanRaj"
    },
    links: {
      type: Array,
      default: ["https://www.google.com"]
    },
    listings: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products'
    }],
    wishlist: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'products'
    }],

  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
