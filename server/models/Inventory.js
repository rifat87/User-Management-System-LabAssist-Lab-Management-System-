import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({

  product_id: { 
    type: String, 
  },
  product_name: { 
    type: String, 
    required: true },
  quantity: { 
    type: Number, 
    required: true }
//   id: { 
//     type: Number, 
//     required: true, 
//     unique: true },
//   phone_no: { 
//     type: String, 
//     required: true }
});

const Inventory = mongoose.model('inventory', inventorySchema);
export default Inventory;
