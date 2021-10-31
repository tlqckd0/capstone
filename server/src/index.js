const express = require('express');
const app = express();
require('dotenv').config();

app.use(express.urlencoded({extended:false}));
app.use('/api',require('./controller'));

app.listen(8080,()=>{
    console.log('start');
})