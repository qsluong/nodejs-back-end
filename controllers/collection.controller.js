var express = require('express'),
    router = express.Router();

var collectionRoute = require('../api/v1/collection.route.v1'),
    auth = require('../api/v1/authentication.route.v1');

router.get('', auth.token, collectionRoute.collection_list);
router.post('', auth.token, collectionRoute.collection_create);
router.put('/:id', auth.token, collectionRoute.collection_update);
router.delete('/:id', auth.token, collectionRoute.collection_delete);

module.exports = router;