var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
// require more modules/folders here!

if(path.exists("sites.txt", req.url){
  httpHelpers.serveAsset(res);
  //server whatever we type if exists.      
}

exports.handleRequest = function (req, res) {

  if(req.method == "GET"){
    if(req.url === "/"){
      httpHelpers.serveIndex(res);      
    //cheack if site file exist. //fs.exists(file, function(exist))
    } else if( req.url ) {
      if( req.url )
    }
    //else 

    console.log(archive.paths.archivedSites);
    console.log(archive.paths.list);

    //when we put /www.google.com(url) in the input on the client, 
    //it will response with page /google/ and 200
    
  }
  // res.end(archive.paths.list);
  // res.end('/<input/');
  console.log(archive.paths.archivedSites);
  console.log(archive.paths.list);
};

fs.exists('/etc/passwd', function (exists) {
  console.log(exists ? "it's there" : 'no passwd!');
});