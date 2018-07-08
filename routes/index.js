var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/examSchedule");

var examSchema = new mongoose.Schema({
    department: String,
    module: String,
    date: String,
    time: String,
    venue: String
});

var Exam = mongoose.model("Exam", examSchema);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get("/calendar", function (req, res) {
    //get all from database

    Exam.find({}, function(err, allExamDetails){
      if (err){
         console.log(err);
      }else{
          res.render("calendar", {exams:allExamDetails});
      }
    });

});

router.get("/camp/new", function (req, res) {
    res.render("dataEntry");
});

router.post("/camp/new", function(req, res){

    var department = req.body.department;
  var module = req.body.module;
  var date = req.body.date;
  var time = req.body.time;
  var venue = req.body.venue;

  var newExam = {department: department, module: module, date: date, time: time, venue: venue};

  Exam.create(newExam, function (err, newlyCreated) {

      if(err){
        console.log(err);
      } else {
        res.redirect("/calendar");
      }
  });
});

module.exports = router;
