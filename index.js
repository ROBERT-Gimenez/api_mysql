const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs')
const app = express();
const apiRouter = require('./routes/apiAdmin');
const corse = require('cors')

require('./db');
/* Middleware */

app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  
app.use(bodyParser.json());/* peticiones en formato json */
app.use(bodyParser.urlencoded({extended:true}));/* codifica la url */
app.set(bcrypt);
app.use(express.json());
app.use(corse());


app.use('/api' , apiRouter);
app.get('/' , (req , res) => {
    res.send('server levantado :)');
})
app.listen(4000 , () => {
    console.log('servidor levantado')
});