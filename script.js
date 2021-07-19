const express = require('express');
const bcrypt = require('bcrypt');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'Database123()',
    database : 'smartigo'
  }
});

const app = express();

app.use(express.json());
app.use( cors() );

const saltRounds = 10;

app.get('/', (req, res) => {res.send('working!!!!')})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt, saltRounds)} )
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)} ) 
app.put('/image', (req, res) => {image.handleImage(req, res, db)} )
app.post('/apicall', (req, res) => {image.handleApiCall(req, res)} )

app.listen(process.env.PORT || 3001);