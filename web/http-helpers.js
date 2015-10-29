var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

var asset;

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

exports.serveIndex = function(res, asset){
  fs.readFile('./public/index.html', function(err, data){
    if(err) throw err;
    res.writeHead(200, headers);
    res.end(data);
  }); 
  
};

// As you progress, keep thinking about what helper functions you can put here!

// console.log("[200] " + req.method + " to " + req.url);
// res.writeHead(200, "OK", {'Content-Type': 'text/html'});
// res.write('<html><head><title>Hello Noder!</title></head><body>');
// res.write('<h1>Welcome Noder, who are you?</h1>');
// res.write('<form enctype="application/x-www-form-urlencoded" action="/formhandler" method="post">');
// res.write('Name: <input type="text" name="username" value="John Doe" /><br />');
// res.write('Age: <input type="text" name="userage" value="99" /><br />');
// res.write('<input type="submit" />');
// res.write('</form></body></html');
// res.end();