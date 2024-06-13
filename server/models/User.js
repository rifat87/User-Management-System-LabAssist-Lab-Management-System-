import mongoose from "mongoose";
import pkg from 'validator'


const { isEmail } = pkg 

const userSchema = new mongoose.Schema({
        // Fields from registration page
    usertype: { 
        type: String,  
    },
    id: { 
          type: Number, 
          required: true, 
          unique: true 
        },
    email: { 
        type: String, 
        required: true, 
        unique: true ,
        validate: {
            validator: isEmail, 
            message:'please enter a valid email'
              // isEmail, message:'please enter a valid email'
        }
    },
    username: { 
          type: String, 
          required: true, 
          unique: true },
      
        // Additional fields
    salt: { 
          type: String, 
          required: true },
    special_key: { 
          type: String, 
          required: true },
    isactive:{
        type: Boolean,
        default: false
    },
    otp:{
        type: String
    }
});


const User = mongoose.model('user', userSchema);

export default User;
