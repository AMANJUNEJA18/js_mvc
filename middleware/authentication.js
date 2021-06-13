function auth(req, res, next){
    console.log('Authentication is happening....');
    next();
}

module.exports.auth = auth;