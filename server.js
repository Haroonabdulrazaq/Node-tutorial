var http = require('http');
var module = require('./module');

http.createServer((req,res)=>{
  res.writeHead(200, {"Content-Type": "text/plain"});
  res.end("Hello world "+ module.myDateTime())

}).listen(8081)