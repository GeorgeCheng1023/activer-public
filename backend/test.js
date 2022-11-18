require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passportLocalMongoose = require("passport-local-mongoose");
const passportLocal = require('passport-local');
const bodyParser = require('body-parser');

// google strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const findOrCreate = require('mongoose-findorcreate');

app = express();

app.use(cookieParser());

// router
app.get('/', (req, res) => {
  res.send('0.0');
})
0
app.get('/login', (req, res) => {
  
})


const PORT = 8000;
app.listen(PORT, () => console.log('server running on port 3500'));