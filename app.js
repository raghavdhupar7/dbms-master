require('dotenv').config();

const express = require('express');
const app = express();

//View Engine
app.set('view engine', 'ejs');

//Middleware
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlEncodedParser);

// Cookie Session
const cookieSession = require('cookie-session');
app.use(cookieSession({
  maxAge : 24*60*60*1000,
  keys: [process.env.COOKIE_SESSION]
}));

// Passport
const passport = require('passport');
const customStratergy = require('./config/customStratergy');
app.use(passport.initialize());
app.use(passport.session());

app.use('/assets', express.static(__dirname + '/assets'));

const authRoutes = require('./routes/authRoutes');
app.use('/auth',authRoutes);
const profileRoutes = require('./routes/profileRoutes');
app.use('/profile',profileRoutes);

const test2 = require('./sql/test2');
app.get('/test',function(req,res){
  test2();
  res.send({tested : 'done'});
});

const server = app.listen(process.env.PORT,()=>{
  console.log("Server started on port "+process.env.PORT);
  console.log("#########################################################################################");
});

process.on('SIGINT',()=>{
  console.log("#########################################################################################");
  console.log('Closing Server');
  server.close()
});
