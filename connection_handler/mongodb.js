const mongoose = require('mongoose');
require('dotenv').config();
dburl = process.env.DATABASE_URL;

mongoose.connect(dburl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(result=>{
    console.log('db connected.....');
}).catch(err=>{
    console.log(err);
})

