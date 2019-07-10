const router = require('express').Router();
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const createTableEngine = require('../sql/createTableEngine');
const linkCourse = require('../sql/linkCourse');
const addCourse = require('../sql/addCourse');
const adminEngine = require('../sql/adminEngine');

const deleteCourse = require('../sql/deleteCourse');
const deleteStudent = require('../sql/deleteStudent');
const deleteTeacher = require('../sql/deleteTeacher');

router.get('/create',(req,res)=>{
  createTableEngine();
  res.redirect('/admin/dashboard');
});

router.get('/dashboard',(req,res)=>{
  adminEngine().then((data)=>{
    res.render('dashboard',{data : data,page : req.query.page});
  });
});

router.get('/course',(req,res)=>{
  res.render('addCourse');
});

router.get('/delete',(req,res)=>{
  if(req.query.table == 'student'){
    deleteStudent(req.query.id).then((bool)=>{
      if(bool){
          res.redirect('/dashboard');
      }
    });
  } else if(req.query.table == 'teacher'){
    deleteTeacher(req.query.id).then((bool)=>{
      if(bool){
        res.redirect('/dashboard?page=teacher');
      }
    });
  } else if(req.query.table == 'course'){
    deleteCourse(req.query.id).then((bool)=>{
      if(bool){
        res.redirect('/dashboard?page=course');
      }
    });
  }
});

router.post('/course',(req,res)=>{
  var data = req.body;
  addCourse(data).then((bool)=>{
    if(bool){
      res.redirect('/dashboard');
    } else {
      res.redirect('/course');
    }
  });
});

router.get('/link',(req,res)=>{
  res.render('linkCourse');
});

router.post('/link',(req,res)=>{
  var data = {
    tid : req.body.tid,
    cid : req.body.cid
  }
  linkCourse(data).then((bool)=>{
    if(bool){
      res.redirect('/dashboard');
    } else {
      res.redirect('/course');
    }
  })
});

module.exports = router;
