import jwt from 'jsonwebtoken'
import Student from '../models/Student.js'
import Teacher from '../models/Teacher.js'
import Instructor from '../models/Instructor.js'
import Password from '../models/Password.js'
import User from '../models/User.js'


const requireAuth = (req, res, next) => {

    const token = req.cookies.jwt

    // chec json wev token exitst & is verified
    if(token){
        // we are going to use jwt.verify method to check the token
        jwt.verify(token, 'labassist group_1 secret', (err, decodedToken) => {
            if(err) { // if there is any error found then redirect the user to login page
                console.log(err.message)
                res.status(401).json({ error: 'Unauthorized' });
            }else{
                console.log(decodedToken)
                next()
            }
        } )
    }
    else{
        res.status(401).json({ error: 'Unauthorized' });
    }
}


const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
  
    if (token) {
      jwt.verify(token, 'labassist group_1 secret', async (err, decodedToken) => {
        if (err) {
          console.error(err);
          res.status(401).json({ error: 'Unauthorized' });
        } else {
          const userId = decodedToken.id;
          try {
            const user = await User.findOne({ id: userId });
            if (user) {
              req.user = user; // Attach the user object to the request for further processing
              next(); // Proceed to the next middleware or route handler
            } else {
              res.status(404).json({ error: 'User not found' });
            }
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
        }
      });
    } else {
      res.status(401).json({ error: 'Unauthorized' });
    }
  };


export default { requireAuth, checkUser }
