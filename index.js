const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const decodeIDToken = require('./auth.js');

//import dal functionality
const dal = require('./dal.js');

//serve files from public directory
app.use(cors());
app.use(decodeIDToken);
app.use(express.static(path.join(__dirname, '/bank-frontend/build')));


app.get('/', (req,res)=>{
  res.send('connected to express server')
})

// route for creating an account
app.get('/account/create/:name/:email', (req,res)=>{
  dal.create(req.params.name, req.params.email)
    .then((result) => {
      res.send(result);
      console.log('called on dal.create: response ', result);
    });
});

// route for looking up account information
app.get('/account/lookup/:email', (req,res)=>{
    dal.find(req.params.email)
      .then((result) => {
        res.send(result);
        console.log('called on dal.find: response ', result);
      });
});

// route for updating account information
app.get('/account/update/:email/:amount', (req,res) =>{
  dal.update(req.params.email, Number(req.params.amount))
    .then((result)=>{
      res.send(result);
      console.log('called on dal.update: response ', result);
    })
})

// for local development or production
var port = process.env.PORT || 4000;
app.listen(port, () => console.log('listening on port ', port))