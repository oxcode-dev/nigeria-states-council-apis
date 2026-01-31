import express from "express"
import mongoose from "mongoose"
import { config } from "dotenv"
// import statesRouter from "./routes/statesRouter.js"
// import lgasRouter from "./routes/lgasRouter.js"
// import wardsRouter from "./routes/wardsRouter.js"
import bodyParser from "body-parser";
import { State } from "./models/State.js";

config();

const app = express();
const port = 3000;

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

mongoose
  .connect(process.env.mongodb, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
  })
  .then(() => console.log('Database is connected'))
  .catch((error) => console.error('Database connection error', error))

app.use(express.json());

app.get('/api', async(req, res) => {

    try {
        return res.status(201).send('Hello World');

        // const states = await State.find();

        // return res.status(201).send(states);
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ message: error.message })
    }
})

// app.use('/api/states', statesRouter)
// app.use('/api/lgas', lgasRouter)
// app.use('/api/wards', wardsRouter)