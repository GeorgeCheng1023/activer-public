require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport/lib');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');
const passportLocalMongoose = require("passport-local-mongoose");
const passportLocal = require('passport-local/lib');
const bodyParser = require('body-parser');

// google strategy
const GoogleStrategy = require('passport-google-oauth20/lib').Strategy;
const findOrCreate = require('mongoose-findorcreate');
const verifyJWT = require('./middleware/verifyJWT');

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

// mongodb
mongoose.connect("mongodb+srv://admin-pig:test123@cluster0.lfftfsj.mongodb.net/?retryWrites=true&w=majority", {
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
  userData: {
    type: Object,
    require
  },
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = new mongoose.model("User", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// router
app.get('/', (req, res) => {
  console.log('0.0');
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

            const userData = { username: foundUser.username };
            const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'});

            const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});

            // Saving refreshToken with current user
            foundUser.refreshToken = refreshToken;
            foundUser.save();

            // Creates Secure Cookie with refresh token
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });

            return res.json({accessToken, refreshToken, foundUser});
          } else {
            return res.sendStatus(401);
          }
        })
      } else {
        return res.sendStatus(401); //Unauthorized 
      }

    } 
  })
});

app.post('/google/login', (req, res) => {
  const userData = req.body; 

  const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15s'});
  const refreshToken = jwt.sign(userData, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});

  User.findOne({userData: userData}, (err, foundUser) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      if (!foundUser) {
        const newUser = new User({
          username: userData.name,
          userData: userData,
          refreshToken: refreshToken,
        });
        
        newUser.save((err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('User save successfully');
          }
        });
      } else {
        foundUser.refreshToken = refreshToken
        foundUser.save((err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('User save successfully');
          }
        });
      }
    }
  })

  // Creates Secure Cookie with refresh token
  res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 24 * 60 * 60 * 1000 });

  return res.json({correct: true, accessToken, refreshToken, userData});
});

app.post('/api/register', (req, res) => {
  const {user : username, pwd : password, email: email} = req.body;
  if (!username || !password) return res.status(400).json({'message': 'Username and password are requried'})

  // username is duplicate or not
  User.findOne({username: username}, (err, foundUser) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      if (foundUser) {
        return res.status(409).send('該名稱已註冊過');
      } 
    }
  });

  bcrpyt.hash(password, 5, async (err, hash) => {
    if (err) {
      return res.sendStatus(403);
    } else {
      const newUser = new User({
        username: username,
        password: hash,
        userData: {email: email}
      });   
  
      await newUser.save((err) => {
        if (err) {
          return res.sendStatus(403);
        } else {
          console.log('User save successfully');
          return res.json({username});
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
  // console.log(refreshToken);
  User.findOne({ refreshToken: refreshToken }, (err, foundUser) => {
    if (err || !foundUser) {
      return res.sendStatus(403);
    }
    if (foundUser) {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        // console.log(foundUser.userData, decoded);
        if (err || foundUser.userData.name !== decoded.name) return res.sendStatus(403);
        const username = foundUser.username;
        const userData = foundUser.userData;
        const accessToken = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
        console.log(userData);
        return res.json({ username: username, accessToken: accessToken, userData: userData })
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

app.use(verifyJWT);

app.get('/data', async (req, res) => {
  res.send('0.0');
});

const PORT = 3500;
app.listen(PORT, () => console.log('server running on port 3500'));