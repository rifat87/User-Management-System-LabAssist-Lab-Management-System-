import mongoose from "mongoose";
import pkg from 'validator'
import bcrypt from 'bcrypt'
import { z } from 'zod'

const { isEmail } = pkg 

const teacherSchema = new mongoose.Schema({
  // Fields from registration page
  // usertype: { type: String, default: 'Teacher' },
  name: { type: String, required: true },
  dept: { type: String, required: true },
  // session: { type: String, required: true },
  id: { type: Number, required: true, unique: true },
  phone_no: { type: String, required: true },
});

const Teacher = mongoose.model('teacher', teacherSchema);
export default Teacher;
