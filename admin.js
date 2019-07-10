require('dotenv').config();

const express = require('express');
const app = express();

//View Engine
app.set('view engine', 'ejs');

//Middleware
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlEncodedParser);

app.use('/assets', express.static(__dirname + '/assets'));

const adminRoutes = require('./routes/adminRoutes');
app.use('/',adminRoutes);

const test2 = require('./sql/test2');
app.get('/test',function(req,res){
  test2();
  res.send({tested : 'done'});
});

const server = app.listen(process.env.ADMIN_PORT,()=>{
  console.log("Admin Portal Started on "+process.env.ADMIN_PORT);
  console.log("#########################################################################################");
});

process.on('SIGINT',()=>{
  console.log("#########################################################################################");
  console.log('Closing Portal');
  server.close()
});
