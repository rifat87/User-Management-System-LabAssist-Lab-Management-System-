//importing user model
import User from '../models/User.js'
import Student from '../models/Student.js'
import Teacher from '../models/Teacher.js'
import Instructor from '../models/Instructor.js'
import Password from '../models/Password.js'
import Inventory from '../models/Inventory.js'
import nodemailer from 'nodemailer';
import bcrypt from 'bcrypt'


//accessing json web token
import jwt from 'jsonwebtoken'


// Handle errors using method called handleErrors
const handleErrors = (err) => {
    console.log(err.message, err.code)

    // let errors = { email: '', password: ''}
    let errors = { id: '', username: '', phone_no: ''}

    //email encorrect in login form
    // if(err.message === 'incorrect email'){
    //     errors.email = 'that email is not registered'
    // }

    //pss incorrect iin login form
    // if(err.message === 'incorrect password'){
    //     errors.password = 'that password is incorrect'
    // }

    // Check for duplicate ID error
    if(err.code === 11000 && err.keyPattern.id === 1) {
        console.log('ID already exists')
        errors.id = 'ID already exists';
        return errors;
    }

    // Check for duplicate email error
    // else if(err.code === 11000 && err.keyPattern.email === 1) {
    //     console.log('Email already exists')
    //     errors.email = 'Email already exists';
    //     return errors;
    // }

    // Check for duplicate username error
    else if(err.code === 11000 && err.keyPattern.username === 1) {
        console.log('Username already exists')
        errors.username = 'Username already exists';
        return errors;
    }

    // Check for duplicate phone_number error
    else if(err.code === 11000 && err.keyPattern.phone_no === 1) {
        console.log('Phone number already exists')
        errors.phone_no = 'Phone number already exists';
        return errors;
    }

    // //duplicate error code
    // if(err.code === 11000) {
    //     console.log('This email is already exist, please insert new email')
    //     errors.email = 'that email is already registered'
    //     return errors;
    // }

    //validation errors
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}


const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000);
};

// Configure nodemailer to send emails
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "rjnoman003@gmail.com",
      pass: "uxcexizxtlukhtin",
    },
  });

const otp_post = async (req, res) => {
    let dbotp
    // if(await User.findOne({ email }))
    // otp = generateOTP();
    const email = req.body.email; // Assuming email is sent in the request body
    const user = await User.findOne({ email })
    if(user){
        dbotp = user.otp
    }

    // Send OTP to user's email
    const mailOptions = {
        from: 'rjnoman003@gmail.com',
        to: email,
        subject: 'Your OTP for LabAssist verification',
        text: `Welcome to LabAssist. Your OTP is: ${dbotp}. Thank you.`
        };
      
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        console.error('Error sending email: ' + error.message);
        res.status(500).send('Error sending OTP');
        } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('OTP sent successfully');
        }
    });
};


// JWT token craete 
const maxAge = 3*24*60*60

const createToken = (id) => {
    return jwt.sign({ id }, 'labassist group_1 secret', {
        expiresIn: maxAge
    })
}

// posting user data using registration_post

const saveuser_post = async (req, res) => {
    const otp = generateOTP() 

    let demail = req.body.email
    console.log("verify")
    const verify = await User.findOne({ email: demail })
    if(verify){
        console.log("Is active:", verify.isactive);
        if(!verify.isactive){ // false check if the return value works properly or not
            console.log("send otp")
            return res.status(201).json({ message: 'OTP'})                          
        }else{
            console.log("login page redirect")
            return res.status(202).json({ message: "Login"})
        }
    }

    try {
        console.log("Helllo");

        //this console prints all the data of the user
    console.log(req.body);

    // OTP portion

    // const userotp  = parseInt(req.body.otp);
    // console.log("Server OTP:",otp);
    // console.log("User OTP:",userotp);
    // // if(otp == userotp){
        
    // //     res.status(200).json({ message: 'OTP successfully matched' });
    // // }

    // if (otp !== userotp) {
    //     return res.status(400).json({ error: 'OTP does not match' });
    // }

    
        const { usertype, name, dept, session, id, phone_no, email, username, password } = req.body;


        const Salt = await bcrypt.genSalt()
        // console.log(Salt)
        // // Hash the password
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(password, salt);

        
        let user;
        let dbuser;

        if ( usertype === "Student"){
        
            //store data to user table
            dbuser = new User({
                usertype,
                id,
                email,
                username,
                salt: Salt,
                special_key: email,
                otp
            })

        // Create a new user
        user = new Student({
            name,
            dept,
            session,
            id,
            phone_no
        });
    }else if ( usertype === "Teacher"){

        //store data to user table
        dbuser = new User({
            usertype,
            id,
            email,
            username,
            salt: Salt,
            special_key: email,
            otp
        })
        // Create a new user
        user = new Teacher({
            name,
            dept,
            id,
            phone_no
        });
    }else if ( usertype === "Instructor"){
         //store data to user table
         dbuser = new User({
            usertype,
            id,
            email,
            username,
            salt: Salt,
            special_key: email,
            otp
        })

        // Create a new user
        user = new Instructor({
            name,
            dept,
            id,
            phone_no
        });
    }
        await dbuser.save();
        // Save the user to the database
        await user.save();

        const hashed_specialKey = await bcrypt.hash(req.body.email, Salt)

        const passwordData = new Password({
            hashed_specialKey, // Assuming email is the special key
            password
        });
        await passwordData.save();

        // Generate a JWT token
        const token = createToken(user.id);

        res.header('Access-Control-Allow-Origin', 'http://localhost:5173');

        // Set the token in the response as a cookie
        res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge * 1000 });

        res.status(200).json({ user: user._id, created: true });



    } catch (err) {

        const errors = handleErrors(err)
        res.status(400).json({ errors });
    }
}



const registration_post = async (req, res) => {
    const email = req.body.email
    const userotp = req.body.otp
    console.log('User OTP', userotp)

    const user = await User.findOne({ email })
    let dbotp = user.otp
    console.log('DB OTP: ', dbotp)

    if(dbotp === userotp){
        user.isactive = true
        // we need to save the database after modifying is active
        await user.save()
        res.status(200).json({ message: 'OTP successfully matched' });
    }else{
        return res.status(400).json({ error: 'OTP does not match' });
    }

}

const login_post = async(req, res) => {
    const { email, password } = req.body
    let salt
    let specialKey
    let hashed_specialKey

    const user = await User.findOne({ email })
    if(user){
        salt = user.salt
        specialKey = email
        hashed_specialKey = await bcrypt.hash(specialKey, salt)
    }else{
        return res.status(400).json({ error: 'Invalid username or password' });
    }

    try{
        const pass = await Password.login(hashed_specialKey, password)//chekig the email and pass to varify the user , we will send this data to User.js and check the data using the login method
        const token = createToken(user.id)
        res.cookie('jwt', token, { httpOnly: false, maxAge: maxAge*1000})
        res.status(200).json({ message: "Login successful",
            token: token
        })
    }catch(err){
        //sending error for wrong information
        const errors = handleErrors(err)
        res.status(400).json({ errors })
    }
};


const profile_get = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            throw new Error('JWT token is missing');
        }

        const decodedToken = jwt.verify(token, 'labassist group_1 secret');
        const userId = decodedToken.id;
        console.log("this id is the from jwt token", userId)
        //664aa730a831b794bf4afed7

        const user = await User.findOne({ id: userId });
        if (!user) {
            throw new Error('User not found');
        }

        console.log('The user.id is : ', user.id)
        let userData;
        if (user.usertype === 'Student') {
            userData = await Student.findOne({ id: user.id });
            console.log('The userDATA: ', userData.name)
        } else if (user.usertype === 'Teacher') {
            userData = await Teacher.findOne({ id: user.id });
        } else if (user.usertype === 'Instructor') {
            userData = await Instructor.findOne({ id: user.id });
        }

        if (!userData) {
            throw new Error('User data not found');
        }
        let d = parseInt(userId)
        console.log("the value of d is : ", d)
        res.status(200).json({
            usertype: user.usertype,
            id: user.id,
            email: user.email,
            username: user.username,
            name: userData.name,
            dept: userData.dept,
            session: userData.session,
            phone_no: userData.phone_no
            
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message });
    }
};


//Inventory
const inventory_get = async(req, res) => {
    console.log('hello from inventory')
    try {
        // Use Mongoose to find all inventory items
        // Use Mongoose to find all inventory items
    const inventoryData = await Inventory.find({});
    console.log('All the data from inventory');
    console.log(inventoryData);
    res.status(200).json(inventoryData);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error"); // Handle errors
    }
}


const inventory_post = async (req, res) => {
    try {
        const { product_id, product_name, quantity } = req.body;
        
        // Create a new product document using the Mongoose model
        const newProduct = new Inventory({ product_id, product_name, quantity });
        
        // Save the new product to the database
        await newProduct.save();
    
        console.log("Product created successfully");
        res.status(200).send("Product created successfully");
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
      }
}


// inventory update

const inventory_update = async (req, res) => {
    try {
        const productId = req.params.id;
        const { product_name, quantity } = req.body;
    
        // Find the inventory product by product_id and update its details
        const updatedProduct = await Inventory.findOneAndUpdate(
          { product_id: productId },
          { product_name, quantity },
          { new: true }
        );
    
        if (!updatedProduct) {
          return res.status(404).json({ error: 'Product not found' });
        }
    
        console.log('Product updated successfully');
        res.status(200).json({ message: 'Product updated successfully', updatedProduct });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const inventory_delete = async (req, res) => {
    try {
        const productId = req.params.id;
    
        // Remove the inventory product by product_id
        const deletedProduct = await Inventory.findOneAndDelete({ product_id: productId });
    
        if (!deletedProduct) {
          return res.status(404).json({ error: 'Product not found' });
        }
    
        console.log('Product deleted successfully');
        res.status(200).json({ message: 'Product deleted successfully' });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}


const logout_get = (req, res) => {
    //we cannot delete the the JWT token , so what can we is replase the token with empty and shorter time duration which will be removed automatically
    res.cookie('jwt', '', { maxAge: 1 })
    res.status(200).json({ message: "Successfully Loged Out"})
};

export default { registration_post,login_post, logout_get, otp_post, saveuser_post, profile_get, inventory_get, inventory_post, inventory_update, inventory_delete};
