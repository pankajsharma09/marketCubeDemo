const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = 'mongodb://localhost:27017/reactusers';

// mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true });
// mongoose.connection.once('open', () => console.log(`Connected to mongo at ${url}`),
// err => { console.log('Can not connect to the database'+ err)});

mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true,useUnifiedTopology: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);