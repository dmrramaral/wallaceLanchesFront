
const PROXY_CONFIG = [
    {
        context: ['/api'],
        target: 'http://ec2-18-231-74-81.sa-east-1.compute.amazonaws.com:8080',
        secure: false,
        logLevel: 'debug',
       
    }

];
module.exports = PROXY_CONFIG;