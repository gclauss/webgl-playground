var port = process.env.PORT || 5000;

var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname)).listen(port, function(){
    console.log('Server running on ' + port + '...');
});