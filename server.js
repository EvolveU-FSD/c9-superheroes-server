import express from 'express';
import path from 'path';
import myConfig from 'dotenv';
myConfig.config();
import DEBUG from 'debug';
import superheroRouter from './routes/superheroRoutes.js';

export const debug = DEBUG('server:routes');
debug.enabled = true;
const PORT = 5001;
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.get('/slow', (req, res) => {
  console.log('delay for 3 seconds');
  setTimeout(() => {
    let seconds = new Date().getTime();
    res.send({ currentTime: seconds });
  }, 3000);
});
app.use('/api/superhero', superheroRouter);
app.get('*', (req, res) => {
  res.sendFile(path.resolve('public', 'index.html'));
});
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
