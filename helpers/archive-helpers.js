var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var request = require('request');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'), //"/users/nodefolder/web/public"
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback){
  var urlList = [];
  var list = exports.paths.list;
  fs.readFile(list, function(err, data){
    if(err) throw err;
    urlList = data.toString().split('\n');
    callback(urlList);
  });
};

exports.isUrlInList = function(url, callback){
  var result = false;
  var urlList = [];
  var list = exports.paths.list;

  fs.readFile(list, function(err, data){
    if(err) throw err;
    urlList = data.toString().split('\n');
    for(var i=0; i<urlList.length; i++){
      if(urlList[i] === url){
        result = true;
      }
    }
    callback(result);
  });
};

exports.addUrlToList = function(url, callback){
  var result = false;
  var list = exports.paths.list;
  fs.appendFile(list, url+'\n', 'utf8', function(err){
  //l":"www.example.com"}
    if(err) {
      throw err;
    } else {
      console.log('the url has been appended to sites.txt file');
      result = true;
    }
    callback(result);
  });
};

exports.isUrlArchived = function(url, callback){
  var sitePath = path.join(exports.paths.archivedSites, url);
  fs.exists(sitePath, function(exists) {
    callback(exists);
  });
};

exports.downloadUrls = function(urlsList){
  var dest = exports.paths.archivedSites;
  _.each(urlsList, function(url) {
    if (!url) return;
      console.log(url);
    request('http://' + url).pipe(fs.createWriteStream(dest + '/' + url));
  });
};

/////------------test
// exports.isUrlInList('www.google.com',function(result){
//   console.log(result)
// })

exports.downloadUrls(['www.naver.com','www.hotmail.com']);

