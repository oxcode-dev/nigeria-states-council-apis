import express, { json } from "express"
import mongoose from "mongoose"
import { config } from "dotenv"
import statesRouter from "./routes/statesRouter.js"
import lgasRouter from "./routes/lgasRouter.js"
import bodyParser from "body-parser";

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

app.get('/api/collections', (req, res) => {
  // Method 1: Using listCollections (as with native driver)
  mongoose.connection.db.listCollections().toArray((error, collections) => {
    if (error) {
      console.error('Error retrieving collections:', error);
      return res.status(500).send('Error retrieving collection names');
    }
    const collectionNames = collections.map(collection => collection.name);
    res.status(200).json({ collections: collectionNames });
  });
});

app.use(express.json());

app.use('/api/states', statesRouter)
app.use('/api/lgas', lgasRouter)