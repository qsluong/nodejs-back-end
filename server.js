var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    config = require('./config/environment');

var authenticationController = require('./controllers/authentication.controller'),
    accountController = require('./controllers/account.controller');

app.use(bodyParser.json());

app.set('port', (process.env.PORT || config.env.webPort));
app.set('env', (process.env.ENV || 'development'));

// CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use('', authenticationController);
app.use('/account', accountController);

app.use('*', (req, res) => {
    res.status(400);
    res.json({
        'Error' : 'This URL does not exist'
    });
});

app.listen(config.env.webPort, () => {
    console.log('Server listens at port: ' + app.get('port'));
    console.log('http://' + config.env.dbHost + ':' + config.env.webPort);
});

module.exports = app;