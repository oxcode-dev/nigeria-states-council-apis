import express, { json } from "express"
import mongoose from "mongoose"
import { config } from "dotenv"

config();

const app = express();
const port = 3000;

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