var express = require('express'),
    router = express.Router();

var accountRoute = require('../api/v1/account.route.v1'),
    auth = require('../api/v1/authentication.route.v1');

router.get('/:username', auth.token, accountRoute.account_info);
router.put('/:username', auth.token, accountRoute.account_update);
router.delete('/:username', auth.token, accountRoute.account_delete);

module.exports = router;