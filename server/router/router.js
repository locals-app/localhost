const router = require('express').Router();
const controller = require('../controller/controller.js');

router.route('/messages/:username')
.get(controller.getMessagesByUser)
.delete(controller.deleteAllByUser);

router.route('/removeconversation')
.delete(controller.deleteConversation);

router.route('/profiles/createnew')
.post(controller.addProfile);

router.route('/profiles/:username')
.get(controller.getProfile)
.delete(controller.deleteProfile);

module.exports = router;