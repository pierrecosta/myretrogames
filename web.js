// This is taken from the web

// Define vars
var http = require('http');
var fs = require('fs');
var path = require('path');
var port = process.env.PORT || 8081; 

// Listen
http.createServer(function (request, response) {
  console.log(request.url)

  // Don't know what it is
  var filePath = '.' + request.url;
  if (filePath.match('/[^.]*$')) filePath += '/'
    if (filePath.match('/$')) filePath += 'index.html'
     
  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
  }
   
  fs.exists(filePath, function(exists) {
    if (exists) {
      fs.readFile(filePath, function(error, content) {
        if (error) {
          response.writeHead(500);
          response.end();
        }
        else {
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
    }
    else {
      response.writeHead(404);
      response.end();
    }
  });
   
}).listen(port);
 
console.log('Server running at http://127.0.0.1:'+port+'/');
