 var http =require('http')
 var url = require('url')
 var fs = require('fs')


 http.createServer((req,res)=>{
  let q = url.parse(req.url, true)
  let filename = ""

  if(q.pathname === '/' ){
    filename= "." + "/index.html"
  }else{
    filename = q.pathname
  }

  fs.readFile(filename, (err, data)=>{
    if(err) { 
    res.writeHead(404,{ "Content-Type":"text/html"})
    return res.end()}
    res.writeHead(200, {"Content-Type":"text/html"})
      res.write(data)
    return res.end()

  })


 }).listen(3000)