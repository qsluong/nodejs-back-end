var neo4j = require('neo4j-driver').v1,
    config = require('../config/environment'),
    driver = neo4j.driver(config.neoUrl, neo4j.auth.basic('neo4j', 'Password'));

module.exports = driver;