var http = require('http');
var fs = require('fs');
var url = require('url');

const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => {
  if (err) throw err;
  return data;
});

http.createServer((req,res)=>{
let q = url.parse(req.url, true);
let filename = "" 
  if(q.pathname == '/'){
    filename = "."+ "/index.html"
  }else {
    filename = "." + q.pathname
  }

  fs.readFile(filename, function(err, data){
    if(err){
      res.writeHead(404, {"Content-Type": "text/html"})
      res.write(page404)
      return res.end();
    }

    res.writeHead(200, {"Content-Type": "text/html"})
    res.write(data)
    return res.end();

  })
 
 
 
}).listen(8080)