let express = require('express');
let path = require('path');
let bodyParser = require('body-parser');
let mongo = require('mongoose');

let db = mongo.connect('mongodb://localhost:27017/taekwondo');

// let db = mongo.connect("mongodb://localhost:27017/taekwondo", function(err, response){
//   if(err){ console.log( err); }
//   else{ console.log('Connected to ' + db, ' + ', response); }
// });


let app = express();
app.use(bodyParser());
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({extended: true}));


app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

let Schema = mongo.Schema;

let UsersSchema = new Schema({
  name: {type: String},
  address: {type: String},
  level: {type: String},
  taekwondo: {
    belt: {type: String},
    level: {type: Number},
    meta: {
      startdate: {type: Date},
      lastmatch: {type: Date},
    }
  },
  stats: {
    matchesplayed: {type: Number},
    matcheslost: {type: Number},
    fouls: {type: Number},
  }
}, {versionKey: false});

let opponent = {
  uid: {type: mongo.Schema.Types.ObjectId},
  hoguid: {type: mongo.Schema.Types.ObjectId},
  matchdata: {
    punches: [{
      time: {type: Date},
      refs: [{type: mongo.Schema.Types.ObjectId}]
    }],
    kicks: [{
      time: {type: Date},
      refs: [{type: mongo.Schema.Types.ObjectId}]
    }],
    fouls: [{
      time: {type: Date},
      refs: [{type: mongo.Schema.Types.ObjectId}]
    }],
  },
  time: {
    start: {type: Date},
    stop: {type: Date},
    /**
     * Time in milliseconds
     */
    additions: [{type: Number}],
    stopages: [{
      time: {type: Date},
      duration: {type: Number}
    }],
  }
};
let MatchSchema = new Schema({
  red: opponent,
  blue: opponent
});
let model = mongo.model('users', UsersSchema, 'users');

app.post('/api/SaveUser', function (req, res) {
  const mod = new model(req.body);
  if (req.body.mode === 'Save') {
    mod.save(function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send({data: 'Record has been Inserted..!!'});
      }
    });
  } else {
    model.findByIdAndUpdate(req.body.id, {name: req.body.name, address: req.body.address},
      function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send({data: 'Record has been Updated..!!'});
        }
      });
  }
});

app.post('/api/deleteUser', function (req, res) {
  model.remove({_id: req.body.id}, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send({data: 'Record has been Deleted..!!'});
    }
  });
});


app.get('/api/getUser', function (req, res) {
  model.find({}, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
});


app.post('/api/impact', function (req, res) {
  model.findByIdAndUpdate(req.body.id, {name: req.body.name, address: req.body.address},
    function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send({data: 'Record has been Deleted..!!'});
    }
  });
});


app.listen(8080, function () {

  console.log('Example app listening on port 8080!');
});
