var querystring = require("querystring");
var fs          = require("fs");
var formidable  = require("formidable");

function start(response) {
  console.log("Request handler 'start' was called.");
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}

function writeData(res, req) {
  console.log("Request handler 'start' was called.");
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/showData" method="post">'+
    '<textarea name="text" rows="20" cols="60"></textarea>'+
    '<input type="submit" value="Submit text" />'+
    '</form>'+
    '</body>'+
    '</html>';
  res.writeHead(200,{"Content-Type": "text/html; charset=utf-8"});
  res.write(body);
  res.end();
}
function showData(res, req) {
  console.log("Request handler 'uploadData' was called.");
  var postData = "";
  var pathname = url.parse(request.url).pathname;
  console.log("Request for " + pathname + " received.");
  req.setEncoding("utf8");
  req.addListener("data", function(postDataChunk) {
    postData += postDataChunk;
    console.log("Received POST data chunk '" + postDataChunk + "'.");
  });

  req.addListener("end", function() {
    res.writeHead(200,{"Content-Type": "text/plain; charset=utf-8"});
    res.write("You've sent the text: " + querystring.parse(postData).text);
    res.end();
  });
}

function upload(res, req) {
  console.log("Request handler 'upload' was called.");
  console.log("About to parse");
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
    console.log("Parsing done ");
    fs.rename(files.upload.path, "/tmp/test.png", function(err) {
      if (err) {
        fs.unlink("/tmp/test.png");
        fs.rename(files.upload.path, "/tmp/test.png");
      }
    });
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    res.write("received image:<br/>");
    res.write("<img src='/show' />");
    res.end();
  });
}

function show(res) {
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
exports.start     = start;
exports.upload    = upload;
exports.showData  = showData;
exports.writeData = writeData;
exports.show      = show;

