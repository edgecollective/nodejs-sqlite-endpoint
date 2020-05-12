/*function timeConverter(UNIX_timestamp){
  var a = new Date(UNIX_timestamp * 1000);
//      console.log(a);
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  //var month = months[a.getMonth()];
  var month = ('0'+(a.getMonth()+1)).slice(-2);
  var date = ('0'+a.getDate()).slice(-2);
  var hour = ('0'+a.getHours()).slice(-2);
  var min = ('0'+a.getMinutes()).slice(-2);
  var sec = ('0'+a.getSeconds()).slice(-2);
//var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
  var time = year + '.' + month + '.' + date + '.' + hour + '.' + min + '.' + sec ;
  return time;
}
*/

var format_time = require("./src/format_time.js")
var ip = require("ip");
var express = require("express")
var app = express()
var db = require("./src/database.js")
var md5 = require("md5")
const sqliteToCsv = require("sqlite-to-csv");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

var args = { filePath : "./db.sqlite", outputPath : "./mycsv" };

const fs = require('fs');

var HTTP_PORT = 8000

var local_ip = ip.address();

// Start server
app.listen(HTTP_PORT, () => {
	var outstring = "server running at "+local_ip.toString()+":"+HTTP_PORT.toString();
	console.log(outstring);
    //console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});


// this means that going to the IP:HTTP_PORT will serve up the 'web' directory (and thus index.html, if it exists there)
app.use(express.static('web'))

// serve the most recent data points in JSON format
app.get("/api/data/latest", (req, res, next) => {
    console.log('all')
    var sql = "select * from data order by id desc LIMIT 500"
    var params = []
    db.all(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
}); 

// receive an HTTP POST of some JSON data, and stick it into the sqlite database
app.post("/api/endpoint", (req, res, next) => {
    var errors=[]

   console.log('Got body:', req.body);

   //var object = req.body.object;

   var temperature = req.body.temperature;
   var humidity = req.body.humidity; 
   var pressure = req.body.pressure; 

   console.log(temperature,humidity,pressure);
   
   var ts = Math.round((new Date()).getTime() / 1000);
   var tsh = format_time.convert(ts);

    var data = {
        temp: temperature,
        humid: humidity,
        press: pressure
    }

    var sql ='INSERT INTO data (dateTime,dateHuman,temperature,humidity,pressure) VALUES (?,?,?,?,?)'
    var params =[ts,tsh,data.temp, data.humid, data.press]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})


// Root path
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

