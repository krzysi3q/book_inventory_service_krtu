var errorHandlers = require('./middleware/errorHandlers');
var logHandler = require('./middleware/logHandler');

module.exports = function(stockRepository){
    var express = require('express');
    var bodyParser = require('body-parser');
    var routes = require('./routes')(stockRepository);
    var app = express();

    app.use(bodyParser.json());
    app.use(logHandler);
    
    app.get('/', routes.root);
    app.get('/stock', routes.getStockAll);
    app.post('/stock', routes.postStock);
    app.get('/stock/:isbn', routes.getStockIsbn)

    app.use(errorHandlers.clientError);
    app.use(errorHandlers.serverError);

    return app;
} 


