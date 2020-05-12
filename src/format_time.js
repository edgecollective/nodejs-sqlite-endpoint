exports.convert = function (UNIX_timestamp){
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
  var time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec ;
  //var time = year + '.' + month + '.' + date + '.' + hour + '.' + min + '.' + sec ;
  return time;
}
