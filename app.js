import express, { json } from "express"

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World from Express!', req);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

app.use(express.json());