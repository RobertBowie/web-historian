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

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

exports.serveIndex = function(res, status){
  status = status || 200;
  fs.readFile('./public/index.html', function(err, data){
    if(err) throw err;
    res.writeHead(status, headers);
    res.end(data);
  });   
};

exports.sendRedirect = function(res, location, status){
  status = status || 302;
  res.writeHead(status, {Location: location});
  res.end();
};

exports.sendRespond = function(response, data, statusCode){
  statusCode = statusCode || 200;
  response.writeHead(statusCode, headers);
  response.end(data);
};

exports.send404 = function(res) {
  res.writeHead(404, "Not Found");
  res.end();
};

