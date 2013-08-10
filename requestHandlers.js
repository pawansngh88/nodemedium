var exec = require("child_process").exec;

function start(res) {
  console.log("Request handler 'start' was called.");
  /*function sleep(milliSeconds) {
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds);
  }
  sleep(10000);
  return "Hello start";*/
  var content = "empty";
  exec("ls -lah", function (error, stdout, stderr) {
      res.writeHead(200,{"Content-Type": "text/plain; charset=utf-8"});
      res.write(stdout);
      res.end();
      });
  return content;
}
function upload(res) {
  console.log("Request handler 'upload' was called.");
  res.writeHead(200,{"Content-Type": "text/plain; charset=utf-8"});
  res.write("Hello upload");
  res.end();
}

exports.start = start;
exports.upload = upload;

