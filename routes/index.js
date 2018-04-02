function init(app){

    app.get('/', function (req, res, next) {
        console.log('Request was made to: ' + req.originalUrl);
        res.json("This is unwanted request");
    });

    app.use('/chat',require('./chat'));
}

module.exports = {
    init:init
}

