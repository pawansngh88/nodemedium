var http = require('http');
var url  = require('url');
function start(route,handle) {
  http.createServer(function(req, res) {
    var postData = "";
    var pathname = url.parse(req.url).pathname;
    console.log("Request for "+pathname+" received.");
    req.setEncoding("utf8");
    
    req.addListener("data", function(postDataChunk) {
      postData += postDataChunk;
      console.log("Received POST data chunk '"+ postDataChunk + "'.");
      });
    request.addListener("end", function() {
      route(handle, pathname, res, postData);
      });
    }).listen(8888);
  console.log("Server started.");
}
exports.start=start

