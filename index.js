const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const dbcoonection = require('./connection_handler/mongodb');
require('dotenv').config();
const port = process.env.port;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', require('./routes/userAdmin'));
app.listen(port, () => {
    console.log(`server is run on ${port}`);
})
