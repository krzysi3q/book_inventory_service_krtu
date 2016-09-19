var MongoClient = require('mongodb').MongoClient

var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/book_inventory_services';

var collection = MongoClient.connect(url, {
    db: { bufferMaxEntries: 0 }
  }).then(function(db){
    console.log("Connected succesfully to DB server");
    return db.collection('krtu_books');
});

var stockRepository = {
    stockUp: function(isbn, count){
        return collection.then(function(conn){
            return conn.updateOne({ isbn: isbn }, {
                isbn : isbn,
                count: count
            }, {upsert: true});
        })
    },
    findAll: function(){
        return collection.then(function(conn){
            return conn.find({}).toArray();
        });
    },
    getCount: function(isbn){
        return collection.then(function(conn){
            return conn.find({isbn: isbn}, {count: 1, _id: 0}).limit(1).next();
        });
    }
}

module.exports = stockRepository;