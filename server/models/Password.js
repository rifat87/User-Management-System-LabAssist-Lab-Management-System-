import mongoose from 'mongoose';
import bcrypt from 'bcrypt'

const passwordSchema = new mongoose.Schema({
  hashed_specialKey: { type: String, required: true },
  password: { type: String, required: true }
});

passwordSchema.pre('save', async function( next) {
    const salt = await bcrypt.genSalt()
    // console.log(salt)
    // console.log(this.password)
    this.password = await bcrypt.hash(this.password, salt)
    next()
    // console.log(this)
});


//static method to login user
//The login function you've defined is a static method because it doesn't operate on a specific user document. It takes email and password as arguments and attempts to find a user with that email in the collection.
passwordSchema.statics.login = async function(hashed_specialKey, password){
    const user = await this.findOne({ hashed_specialKey })

    if(user) {
        const auth = await bcrypt.compare(password, user.password)
        if(auth){
            console.log("Password Mathced, go to home page")
            return user;
        }throw Error('incorrect password')
    }throw Error('incorrect email')
}

const Password = mongoose.model('password', passwordSchema);
export default Password;