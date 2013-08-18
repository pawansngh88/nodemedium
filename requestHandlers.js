var exec = require("child_process").exec;
var querystring = require("querystring");
var fs = require("fs");


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
  res.write("You've sent the text: " + querystring.parse(postData).text);
  res.end();
}

function show(res, postData) {
  console.log("Request handler 'show' was called.");
  fs.readFile("/tmp/test.png", function(error, file1) {
  if (error) {
    console.log("'show':"+error);
    res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
    res.write(error + "\n");
    res.end();
  }  else {
    console.log("'show': No Error"+ file1);
    //res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
    //res.write("Sending png file: ");
    res.writeHead(200, {"Content-Type": "image/png"});
    //res.write("<img src='data:image/png;base64,"+file+"'/>");
    res.write(file1, "binary");
    //res.end(file1); also works
    res.end();
    return;
    }
  });
}
exports.start = start;
exports.upload = upload;
exports.show = show;

