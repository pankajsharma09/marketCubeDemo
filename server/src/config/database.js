const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const url = process.env.URL;
try{
  mongoose.connect(url, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });
  console.log('Database is connected to '+url);
}
catch(err){
   console.log('Can not connect to the database' + err); 
}
