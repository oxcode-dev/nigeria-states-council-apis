import express from "express"
import mongoose from "mongoose"
import { config } from "dotenv"
import statesRouter from "./routes/statesRouter.js"
import lgasRouter from "./routes/lgasRouter.js"
import wardsRouter from "./routes/wardsRouter.js"
import usersRouter from "./routes/usersRouter.js"
import bodyParser from "body-parser";
import cors from "cors"
import { authRouter } from "./controllers/authController.js"
import connectDB from "./config/db.js"
import { profileRouter } from "./controllers/profileController.js"
import { passwordResetRouter } from "./controllers/passwordResetController.js"

config();

const app = express();
const port = 3000;

const corsOptions = {
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); 

// Middleware to parse JSON data
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res) => {
  res.send('Hello World from Express!', req);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

connectDB();

app.use(express.json());

app.use('/api/states', statesRouter)
app.use('/api/lgas', lgasRouter)
app.use('/api/wards', wardsRouter)
app.use('/api/auth', authRouter)
app.use('/api/profile', profileRouter)
app.use('/api/users', usersRouter)
app.use('/api/password', passwordResetRouter)