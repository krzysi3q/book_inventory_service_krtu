var stockRepository = require('./middleware/stockRepository');
var app = require('./app')(stockRepository);
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});