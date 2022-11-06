const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const app = express();
const apiRouter = require('./routes/apiAdmin')

require('./db');
/* Middleware */
app.use(bodyParser.json());/* peticiones en formato json */
app.use(bodyParser.urlencoded({extended:true}));/* codifica la url */
app.set(bcrypt);
app.use(express.json());

app.use('/api' , apiRouter);
app.get('/' , (req , res) => {
    res.send('server levantado :)');
})
app.listen(3000 , () => {
    console.log('servidor levantado')
});