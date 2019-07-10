const router = require('express').Router();
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const passport = require('passport');

var mapTeachers = require('../sql/mapTeachers');
var registerFeedbackEngine = require('../sql/registerFeedbackEngine');
var fetchFeedbacks = require('../sql/fetchFeedbacks');
var protectRouteEngine = require('../sql/protectRouteEngine');
var mapCourse = require('../sql/mapCourse');

const isAuthenticated = function(req,res,next){
  if(req.user){
    next();
  } else {
    res.redirect('/auth/login');
  }
}

const protectRoute = function(req,res,next){
  if('SID' in user){
    var data = {
      sid : req.user.SID,
      tid : req.query.tid,
      cid : req.query.cid
    }
    protectRouteEngine(data).then((bool)=>{
      if(bool && req.user){
        next();
      } else {
        res.redirect('/profile/feedbacks?cid='+req.query.cid);
      }
    });
  } else {
    res.redirect('/profile/feedbacks?cid='+req.query.cid);
  }
}

router.get('/',isAuthenticated,(req,res)=>{
  if('TID' in req.user){
      mapCourse([req.user]).then((data)=>{
        console.log(data[0].courses);
        res.render('profile',{user :req.user,courses : data[0].courses});
      });
  } else {
    res.render('profile',{user :req.user});
  }
});

router.get('/list',isAuthenticated,(req,res)=>{
  mapTeachers().then((data)=>{
    res.render('list',{teacher : data});
  });
});

router.get('/feedbacks',isAuthenticated,(req,res)=>{
  fetchFeedbacks(req.query).then((data)=>{
    var renderData = {
      avg : {
        RA : 0,
        RB : 0,
        RC : 0
      },
      max : {
        RA : 0,
        RB : 0,
        RC : 0
      },
      min : {
        RA : 0,
        RB : 0,
        RC : 0
      }};
    if(data.length > 0){
      renderData.avg.RA = _.meanBy(data,'RATING_A');
      renderData.avg.RB = _.meanBy(data,'RATING_B');
      renderData.avg.RC = _.meanBy(data,'RATING_C');
      renderData.max.RA = _.maxBy(data,'RATING_A').RATING_A;
      renderData.max.RB = _.maxBy(data,'RATING_B').RATING_B;
      renderData.max.RC = _.maxBy(data,'RATING_C').RATING_C;
      renderData.min.RB = _.minBy(data,'RATING_B').RATING_A;
      renderData.min.RA = _.minBy(data,'RATING_A').RATING_B;
      renderData.min.RC = _.minBy(data,'RATING_C').RATING_C;
    }
    console.log(renderData);
    if('TID' in req.user){
        mapCourse([req.user]).then((courseData)=>{
          res.render('feedbacks',{feedbacks : data,user : req.user,filter : req.query,courses : courseData[0].courses,renderData : renderData});
        });
    } else {
      res.render('feedbacks',{feedbacks : data,user : req.user,filter : req.query,renderData : renderData});
    }
  });
});

router.get('/feedback',protectRoute,(req,res)=>{
  res.render('feedback',{user : req.user,teacherid : req.query.tid,courseid : req.query.cid});
});

router.post('/feedback',(req,res)=>{
  var data = {
    tid : req.body.tid,
    sid : req.body.sid,
    cid : req.body.cid,
    ra : req.body.ra,
    rb : req.body.rb,
    rc : req.body.rc,
    ca : req.body.ca,
    cb : req.body.cb
  };
  registerFeedbackEngine(data).then((bool)=>{
    if (bool){
      res.redirect('/profile/feedbacks?tid='+req.body.tid+'&cid='+req.body.cid);
    } else {
      res.redirect('/profile/feedbacks?tid='+req.body.tid+'&cid='+req.body.cid);
    }
  });
});


module.exports = router;
