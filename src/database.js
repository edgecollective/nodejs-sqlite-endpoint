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

var format_time = require("./format_time.js");
var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

//const DBSOURCE = "/media/pi/USB20FD/db.sqlite" 
const DBSOURCE = "./db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
      // Cannot open database
      console.error(err.message)
      throw err
    }else{
        console.log('Connected to the SQlite database.')
        db.run(`CREATE TABLE data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            dateTime INTEGER,
	    dateHuman TEXT,
            temperature FLOAT(4,2),
            humidity FLOAT(4,2),
            pressure FLOAT(4,2)
            )`,(err) => {
        if (err) {
            // Table already created
            console.log("found table 'data'");
        }else{
            console.log("created table 'data'"); 
        }
    })  
    }
})


module.exports = db

