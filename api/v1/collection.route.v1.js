var Collection = require('../../models/collection');

collection_list = (req, res) => {

    Collection.find()
        .then(result => res.status(200).json(result))
};

collection_create = (req, res) => {

    Collection.create(req.body)
        .then(result => res.status(200).json(result))
        .catch(error => res.status(400).json(error));
};

module.exports = {
    collection_list,
    collection_create
};