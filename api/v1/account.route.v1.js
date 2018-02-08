var mongodb = require('../../databases/mongodb'),
    User = require('../../models/user');

account_info = (req, res) => {

    User.findOne({ username: req.params.username })
        .then(user => res.status(200).send(user))
        .catch(error => res.status(400).json(error))
};

account_update = (req, res) => {

    User.findOneAndUpdate({ username : req.params.username }, req.body, { new : true})
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error));
};

account_delete = (req, res) => {

    User.findOneAndRemove({ username : req.params.username })
        .then(user => res.status(200).json(user))
        .catch(error => res.status(400).json(error))
};

module.exports = {
    account_info,
    account_update,
    account_delete
};