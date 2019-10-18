const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = process.env.URL;

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
  () => { console.log('Database is connected') },
  err => { console.log('Can not connect to the database' + err) }
);