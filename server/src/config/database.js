const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/marketcubedb';

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);