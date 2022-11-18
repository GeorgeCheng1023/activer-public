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
const verifyJWT = require('./middleware/verifyJWT');

// mongodb
mongoose.connect("mongodb://127.0.0.1:27017/activerUserDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) throw err;
  console.log("Connect TO MongoDB");
});
// User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    require
  },
  password: {
    type: String,
    require
  },
  // isAdmin: {
  //   type: Boolean,
  //   default: false
  // },
  refreshToken: String,
});

const User = new mongoose.model("User", userSchema);

userSchema.plugin(findOrCreate);

// preprocess
const app = express();
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
// serve static file
app.use(express.static("public"));
// built-in middleware for json
app.use(express.json());
// Cross Origin Resource Share
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
/// middleware for cookies
app.use(cookieParser());

app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
//將request進來的data 轉成 json()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

// router
app.get('/', (req, res) => {
  res.send('0.0');
})

app.get('/api/login', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
})  

app.post('/api/login', (req, res) => {
  const {user : username, pwd : password} = req.body;

  if (!username || !password) return res.status(400).json({'message': 'Username and password are requried'})

  User.findOne({username: username}, (err, foundUser) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      if (foundUser) {
        bcrpyt.compare(password, foundUser.password, (err, result) => {
          if (result) {

            const user = { username: foundUser.username };
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'});

            const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});

            // Saving refreshToken with current user
            foundUser.refreshToken = refreshToken;
            foundUser.save();

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });

            return res.json({correct: true, accessToken, refreshToken, foundUser});
          } else {
            return res.send('error');
          }
        })
      } else {
        return res.status(401); //Unauthorized 
      }

    } 
  })
});

app.post('/api/register', (req, res) => {
  const {user : username, pwd : password} = req.body;
  if (!username || !password) return res.status(400).json({'message': 'Username and password are requried'})

  // duplicate
  User.findOne({username: username}, (err, foundUser) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      if (foundUser) {
        return res.sendStatus(409);
      } 
    }
  });

  bcrpyt.hash(password, 5, async (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      const newUser = new User({
        username: username,
        password: hash
      });   
  
      await newUser.save((err) => {
        if (err) {
          console.log(err);
          return res.send(err);
        } else {
          console.log('User save successfully');
          return res.json({ isRegister: true });
        }
      });
    }
  });
})

app.get('/refresh', (req, res) => {
  const cookies = req.cookies;
  // console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  User.findOne({ refreshToken: refreshToken}, (err, foundUser) => {
    if (err || !foundUser) {
      return res.sendStatus(403);
    }
    if (foundUser) {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
        const user = {"username": decoded.username};
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
        res.json({ username: decoded.username, accessToken: accessToken })
      })
    }
  })
});

app.get('/logout', (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(403);
  const refreshToken = cookies.jwt;

  User.findOne({ refreshToken: refreshToken }, (err, foundUser) => {
    if (err) {
      return res.sendStatus(403);
    }
    if (!foundUser) {
      res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true }) 
      return res.sendStatus(204);
    }
  
    foundUser.refreshToken = '';
    // secure: true - only serves on https  
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true }) 
    return res.sendStatus(204);
  })
});

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/activer",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      console.log(profile);
      return cb(err, user);
    });
  }
));

app.get("/auth/google",
  passport.authenticate('google', { scope: ["profile"] })
);

app.get('/auth/google/activer', 
  passport.authenticate('google', { failureRedirect: '/api/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

app.use(verifyJWT);

app.get('/data', async (req, res) => {
  console.log(req.user);
  // res.json(req.user);
  res.send('0.0');
});

const PORT = 3500;
app.listen(PORT, () => console.log('server running on port 3500'));