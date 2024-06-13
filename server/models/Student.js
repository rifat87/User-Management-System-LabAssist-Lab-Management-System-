import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

  name: { 
    type: String, 
    required: true 
  },
  dept: { 
    type: String, 
    required: true },
  session: { 
    type: String, 
    required: true },
  id: { 
    type: Number, 
    required: true, 
    unique: true },
  phone_no: { 
    type: String, 
    required: true }
});

const Student = mongoose.model('student', studentSchema);
export default Student;
