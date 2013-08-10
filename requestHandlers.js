var exec = require("child_process").exec;

function start(res, postData) {
  console.log("Request handler 'start' was called.");
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
  res.writeHead(200,{"Content-Type": "text/html; charset=utf-8"});
  res.write(body);
  res.end();
}
function upload(res, postData) {
  console.log("Request handler 'upload' was called.");
  res.writeHead(200,{"Content-Type": "text/plain; charset=utf-8"});
  res.write("You've sent: " + postData);
  res.end();
}

exports.start = start;
exports.upload = upload;

