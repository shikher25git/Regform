const express = require('express');
const app = express();
const path = require('path');
const multer = require("multer");
var bodyParser = require('body-parser');
const router = express.Router();
const db = require('./dbcon');

// var query = require('./query');

app.use(bodyParser.urlencoded({ extended: true }));
var urlEncoder = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())

db.connect(function(err){
  if(err) throw err;
  console.log('Connected');
});

const storage = multer.diskStorage({
  destination: './Uploads/',
  filename: function (req, file, cb) {
   cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
 });

 var upload = multer({
  storage: storage
 });

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

//add the router
app.use('/', router);
app.listen(process.env.port || 3000);

router.post('/dopost', function (req, res, next) {
  // console.log(req.body.username);
  var sql = "SELECT Username FROM user where Username = '" + req.body.username +"'";
  db.query(sql, function(err, data, fields){
      if (err) throw err;
      // console.log(data);
      res.send(data.length.toString());
    });
});

router.post('/submit', upload.single('file_upld'), function (req, res, next) {
  console.log(req.body);
  var reg = '/jpeg|jpg|gif|png/';
  if (reg.match(path.extname(req.file.originalname).toLowerCase())) {

    var post = {
      name: req.body.name ,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password ,
      image: './Uploads/' + req.file.fieldname + '-' + Date.now() + path.extname(req.file.originalname) ,
      about: req.body.about
     };

  var sql = "INSERT INTO user VALUES ('" + post.name + "' ,'" + 
  post.email + "' ,'" + 
  post.username + "' ,'" + 
  post.password + "' ,'" + 
  post.image + "' ,'" +post.about + "')";
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    // console.log(result);
    console.log("result");
});
    // console.log(obj);
    res.send('Data submitted successfully'); }
    else{
      res.send("Error:Enter only Image")
   }
});

console.log('Running at Port 3000');