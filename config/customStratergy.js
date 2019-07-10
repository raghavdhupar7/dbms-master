const passport = require('passport');
const CustomStratergy = require('passport-custom').Strategy;
const _ = require('lodash');

var loginEngine = require('../sql/loginEngine');
var getData = require('../sql/getData');

passport.serializeUser((user,done)=>{
  out = {}
  if('SID' in user){
    out.uid = 'sid';
    out.id = user.SID;
  } else {
    out.uid = 'tid';
    out.id = user.TID
  }
  done(null,out);
});

passport.deserializeUser((out,done) =>{
  data = {
    id : out.id
  };
  outBinds = {
    uid : out.uid
  }
  getData(outBinds,data).then((data)=>{
    user = _.zipObject(_.map(data.metaData,'name'), data.rows[0]);
    done(null,user);
  });
});


passport.use(new CustomStratergy(
  function(req,done){
  var data = {
    id : req.body.id
  };
  loginEngine(data,req.body.password).then((dbres)=>{
    if(dbres){
      user = _.zipObject(_.map(dbres.metaData,'name'), dbres.rows[0]);
      done(null,user)
    } else {
      done(null,null);
    }
  });
}));
