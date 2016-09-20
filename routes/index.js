
module.exports = function(stockRepository){
    return {
        root: function(req, res, next){
            res.send('Hello World! from test');
        },

        getStockAll: function(req, res, next){
            stockRepository.findAll().then(function(arr){
                res.json(arr);
            }).catch(next)
        },

        getStockIsbn: function(req, res, next){
            stockRepository.getCount(req.params.isbn)
            .then(function(doc){
                if(doc === null){
                    clientError(req, res, next);
                } else {
                    res.json(doc);
                }
            })
        },

        postStock: function(req, res, next){
            stockRepository.stockUp(req.body.isbn, req.body.count)
            .then(function(){
                res.json({
                    ok: true
                })
            }).catch(next);
        }   
    }
}