import express from 'express';
import path from 'path';

const app = express();
const port = 3001;

app.use(express.static(path.join(__dirname, '../../../public')));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
