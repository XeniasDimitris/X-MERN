const https = require('https');
const fs = require('fs');
const path = require('path')
var privateKey = fs.readFileSync(path.join(__dirname,'./ssl/server.key'));
var certificate = fs.readFileSync(path.join(__dirname,'./ssl/server.crt'));

/* These are the private key of our server, and the certificate (which is self-signed with the same key) 
and which contains also the public key to be sent to the client*/

var credentials = {key: privateKey, cert: certificate}; 

exports.createServer = (app) =>{
    PORT = process.env.PORT || 8765;
    https.createServer(credentials,app).listen(PORT,()=>{
        console.log(`Server Created in port ${PORT}`)
    });
}

