var http = require('http');
var url  = require('url');
function start(route,handle) {
  http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    console.log("Request for "+pathname+" received.");
    route(handle, pathname, res);
    /*res.writeHead(200,{"Content-Type": "text/plain"});
    var content = route(handle, pathname);
    res.write(content+'');
    //res.write("Hello World");
    res.end();*/
    }).listen(8888);
  console.log("Server started.");
}
exports.start=start

