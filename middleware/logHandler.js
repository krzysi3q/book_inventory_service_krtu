module.exports = function(req, res, next){
    console.log("incoming request " + new Date());
    next();
}