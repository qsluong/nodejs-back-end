var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    name: String,
    createdByUser: String
});

var Collection = mongoose.model('collection', CollectionSchema);

module.exports = Collection;