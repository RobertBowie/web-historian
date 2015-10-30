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
    var url;
    var archiveSite = archive.paths.archivedSites + url;
    var loadingSite = archive.paths.siteAssets + 'loading.html' ;
    req.on('data', function(data){
      url = data.toString().substring(4);
      //url=www.google.com
      console.log('post data', url);
      // check if the url exists in the sites.txt
      archive.isUrlInList(url, function(inList) {
        // if it does then check if archived
        if (inList) {
          // check if archived
          archive.isUrlArchived(url, function(isArchived) {
            // show archive page
            if (isArchived) {
              httpHelpers.sendRedirect(res, '/' + url);
            // else
            } else {
              // show loading page
              httpHelpers.sendRedirect(res, '/loading.html');
            }
          });
        // else 
        } else {
          archive.addUrlToList(url, function(added) {
            return added;
          });
          // show loading page
          httpHelpers.sendRedirect(res, '/loading.html');
        }
      });
    });
  }
};

//url=www.google.com

exports.handleRequest = function (req, res) {
    var action = actions[req.method];
    if(action){
      actions ? action(req, res) : httpHelpers.send404(res);
    }    
};