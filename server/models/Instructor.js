import mongoose from "mongoose";
import pkg from 'validator'
import bcrypt from 'bcrypt'
import { z } from 'zod'

const { isEmail } = pkg 

const instructorSchema = new mongoose.Schema({
  // Fields from registration page
  // usertype: { type: String, default: 'Instructor' },
  name: { type: String, required: true },
  dept: { type: String, required: true },
  // session: { type: String, required: true },
  id: { type: Number, required: true, unique: true },
  phone_no: { type: String, required: true },
});




const Instructor = mongoose.model('instructor', instructorSchema);
export default Instructor;
