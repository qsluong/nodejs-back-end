var assert = require('chai'),
    mongodb = require('mongoose'),
    Account = require('../models/account');

describe('Account', () => {
    it('Create new account', (done) => {
        var account = {
            username: 'test',
            password: 'test'
        };
        Account.create(account);
        done()
    })
});