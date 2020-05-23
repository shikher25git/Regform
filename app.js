const express = require('express');
const app = express();
const path = require('path');
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

router.post('/submit', function (req, res, next) {
  console.log(req.body);
  var sql = "INSERT INTO user VALUES ('" + req.body.name + "' ,'" + 
  req.body.email + "' ,'" + 
  req.body.username + "' ,'" + 
  req.body.password + "' ,'" + 
  req.body.image + "' ,'" +req.body.about + "')";
  let query = db.query(sql, (err, result) => {
    if(err) throw err;
    // console.log(result);
    return result;
});
    // console.log(obj);
    res.send('Data submitted successfully');
});

console.log('Running at Port 3000');