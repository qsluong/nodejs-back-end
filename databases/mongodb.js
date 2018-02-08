var mongoose = require('mongoose'),
    config = require('../config/environment');

// Gebruik es6 promises ipv mongoose mpromise
mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUrl);
const connection = mongoose.connection
    .once('open', () => console.log('Connected to Mongo on ' + config.mongoUrl))
    .on('error', (error) => {
        console.warn('Warning', error.toString()
        );
    });

module.exports = connection;