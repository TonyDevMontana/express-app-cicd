import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello Devops');
});

app.listen(3000);
