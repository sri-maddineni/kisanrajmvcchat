import mongoose, { Schema } from "mongoose";

// Define schema for equipment
const equipmentSchema = new mongoose.Schema({
  item: {
    type: String,
    default:"" // Reference to equipment model
  },
  des: {
    type: String,
    default: null
  },
  cost: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: ""
  },
  address: {
    type: String,
    default: ""
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users' // Reference to user model
  },
  purp: {
    type: String,
   default:"" // Reference to user model
  },
}, { timestamps: true });

// Define the Equipment model
export default mongoose.model('Equipment', equipmentSchema);



















// // Define schema for equipment
// const equipmentSchema = new mongoose.Schema({
//   equipment_category_id: {
//     type: Schema.Types.ObjectId,
//     ref: 'EquipmentCategory' // Reference to equipment_category model
//   },
//   equipment_desc: { type: String, default: null },
//   equipment_model: { type: String, default: null },
//   license: { type: String, default: null },
//   owner_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'users' // Reference to user model
//   },
// },{timestamps:true});

// // Define the Equipment model
// export default mongoose.model('Equipment', equipmentSchema);