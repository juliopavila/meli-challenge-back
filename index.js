const express = require('express');
const cors = require('cors');
const app = express();
//Config
const { config } = require('./config/index');
//Body parser
app.use(express.json());
app.use(cors());
//Router api
app.use('/api', require(__dirname + '/routes/items'));

app.listen(config.port, () => {
  console.log(`Listening http://localhost:${config.port}`);
});
