var express = require('express'),
    router = express.Router();

var cardRoute = require('../api/v1/card.route.v1'),
    auth = require('../api/v1/authentication.route.v1');

router.get('/:collectionId', auth.token, cardRoute.card_list);
router.post('', auth.token, cardRoute.card_create);
router.put('', auth.token, cardRoute.card_update);
router.delete('/:id', auth.token, cardRoute.card_delete);

module.exports = router;