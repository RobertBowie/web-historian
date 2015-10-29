var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var url = require('url');
var fs = require('fs');

var actions = {
  'GET': function(req, res){
    var parts = url.parse(req.url);
    var urlPart = parts.pathname === '/' ? '/index.html' : parts.pathname;

    var publicSite = archive.paths.siteAssets + urlPart;
    var archiveSite = archive.paths.archivedSites + urlPart;
    // console.log('url',req.url);
    // console.log('publicSite', publicSite);
    // console.log('archiveSite', archiveSite);
    // console.log(parts);
    if(req.url === "/favicon.ico"){
      httpHelpers.send404(res);
    } else {
        fs.readFile(publicSite, 'utf8', function(err, data){
        if(err) {//if publicSite does not exist
          //look one in the archiveSite.
          fs.readFile(archiveSite, 'utf8', function(err, data){
            if(err) {
              console.log('send404 zone')
              //return loading page;
              httpHelpers.send404(res);
            } else {
              console.log("hit archiveSite");
              httpHelpers.sendRespond(res, data);
            }
          });
        } else { //the file exists in the publicSite
          console.log("hit publicSite");
          httpHelpers.sendRespond(res, data);
        }
      });
    }
  },
  'POST': function(req, res){
    var list = archive.paths.list;
    req.on('data', function(data){
      var url = data.toString().substring(4);
      //url=www.google.com
      console.log('post data', url);
      fs.appendFile(list, url+"test"+'\n', 'utf8', function(err){
        //l":"www.example.com"}
        if(err) {
          throw err;
        } else {
          console.log('the url has been appended to sites.txt file')
        }
      });
    });
    res.writeHead(302, {'Content-Type': "text/html"});
    res.end();
  }
};

//url=www.google.com

exports.handleRequest = function (req, res) {
    var action = actions[req.method];
    if(action){
      actions ? action(req, res) : httpHelpers.send404(res);
    }    
};