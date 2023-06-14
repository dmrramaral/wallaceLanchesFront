
const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://ec2-54-233-129-192.sa-east-1.compute.amazonaws.com:8080',
        secure: false,
        logLevel: 'debug',
       
    }

];
module.exports = PROXY_CONFIG;