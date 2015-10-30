// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

archive.readListOfUrls(function(urlList){
  archive.downloadUrls(urlList);
});

//echo "running" + $data >> /Users/fred/cronlog
//40 8 * * * /bin/bash -l -c 'cd /path/to/toolbox && git pull -q'