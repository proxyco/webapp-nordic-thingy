const http = require('http');

let postLog = function(payload) {
  let headers = {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload, 'utf8'),
   };

  let options = {
      host: 'localhost',
      port: 8080,
      path: '/',
      method: 'POST',
      headers: headers
  };

  let reqPost = http.request(options, (res) => {
      console.log("status code: ", res.statusCode);
    
      res.on('data', (chunks) => {
        //   console.log('http_post,chunks=', chunks)
      });
  });

  console.log('http_post,write')
  reqPost.write(payload);
  console.log('http_post,end0')
  reqPost.end();
  console.log('http_post,end1' )
  

  reqPost.on('error', (err) => {
      console.error('ERROR')    
      console.error(err);
  });
}

module.exports = {
  postLog
}
