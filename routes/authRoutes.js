const router = require('express').Router();
const _ = require('lodash');
const bcrypt = require('bcryptjs');
const passport = require('passport');
//const customStratergy = require('../config/customStratergy');

const registerStudentEngine = require('../sql/registerStudentEngine');
const registerTeacherEngine = require('../sql/registerTeacherEngine');
const loginEngine = require('../sql/loginEngine');

router.get('/login',(req,res)=>{
  res.render('login');
});

router.get('/logout',(req,res)=>{
  req.logout();
  res.redirect('/auth/login');
});

router.post('/login',passport.authenticate('custom', { failureRedirect: '/auth/login' }),(req,res)=>{
  res.redirect('/profile');
});

router.get('/registerStudent',(req,res)=>{
  res.render('registerStudent');
});

router.post('/registerStudent',(req,res)=>{
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    var data = {
      id : req.body.id,
      password : hash,
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      branch : req.body.branch,
      contact : req.body.contact,
      degree : req.body.degree,
      dob : req.body.day+'/'+req.body.month+'/'+req.body.year,
      joining : parseInt(req.body.joining)
    }
    registerStudentEngine(data).then((dbres)=>{
      if(dbres.output == 0){
        res.redirect('/auth/login');
      } else {
        res.redirect('/auth/registerStudent');
      }
    });
  });
  });

router.get('/registerTeacher',(req,res)=>{
  res.render('registerTeacher');
});

router.post('/registerTeacher',(req,res)=>{
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    var data = {
      id : req.body.id,
      password : hash,
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      designation : req.body.designation,
      department : req.body.department,
      email : req.body.email,
      contact : req.body.contact,
      dob : req.body.day+'/'+req.body.month+'/'+req.body.year,
      joining : parseInt(req.body.joining)
    }
      registerTeacherEngine(data).then((dbres)=>{
        if(dbres.output == 0){
          res.redirect('/auth/login');
        } else {
          res.redirect('/auth/registerTeacher');
        }
      });
    });
  });

module.exports = router;
