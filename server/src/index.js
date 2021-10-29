const express = require('express');
const app = express();

const api = require('./controller');

app.use('/api',api);
app.use(express.urlencoded({extended:false}));
app.listen(8080,()=>{
    console.log('start');
})