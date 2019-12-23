const express = require('express');
const cors = require('cors');
const app = express();

//Config
const { config } = require('./config/index');
//Body parser
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
