import express from "express"
import { config } from "dotenv"
import statesRouter from "./routes/statesRouter.js"
import lgasRouter from "./routes/lgasRouter.js"
import wardsRouter from "./routes/wardsRouter.js"
import usersRouter from "./routes/usersRouter.js"
import publicStateRouter from "./routes/publicStateRouter.js"
import publicLgasRouter from "./routes/publicLgasRouter.js"
import bodyParser from "body-parser";
import cors from "cors"
import { authRouter } from "./controllers/authController.js"
import connectDB from "./config/db.js"
import { profileRouter } from "./controllers/profileController.js"
import { passwordResetRouter } from "./controllers/passwordResetController.js"
import rateLimit from "express-rate-limit"
import path from "path"

config();

const app = express();
const port = 3000;

const corsOptions = {
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true,
  origin: [process.env.CLIENT_URL || 'http://localhost:3000', 'http://localhost:5173', 'https://nigerian-states-councils-admin.vercel.app/'],
};

app.use(cors(corsOptions));
// app.options('*', cors(corsOptions)); 

// Middleware to parse JSON data
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: "Too many requests from this IP, please try again after 15 minutes",
});

// Apply the rate limiter to all requests
app.use(limiter);

// app.get('/', (req, res) => {
//   // res.send('Hello World from Express!', req);
//   res.render('index', { title: 'Express' });
// });

app.use(express.static(path.join('public')));

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
app.use('/api/public', publicStateRouter)
app.use('/api/public', publicLgasRouter)
