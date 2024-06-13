import express from 'express';
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
// import router from './routes/pathRouter';
import router from './routes/pathRouter.js'
import cors from 'cors';
// import { requireAuth, checkUser } from './middleware/authMiddleware.js'

import authMiddleware from './middleware/authMiddleware.js';

const { requireAuth, checkUser } = authMiddleware

const app = express();

// app.use(cors({origin:"*", credentials:true}));
app.use(cors({
  origin: 'http://localhost:5173',
  // methods: ['GET', 'POST', 'PUT', 'DELETE'],
  // headers: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.options('*', cors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173'); // Replace with your React app's URL
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(express.json());
app.use(cookieParser())



//database connection
const dbURI = 'mongodb+srv://netninja:auth123@cluster0.rntqeu5.mongodb.net/labassist?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(dbURI).then((result) => app.listen(PORT, () => {console.log(`Started listenig ${PORT}`)})).catch((err) => console.log(err)) 


//check for all request
app.get('*', checkUser)

app.use(router)

const PORT = process.env.PORT || 5000;
