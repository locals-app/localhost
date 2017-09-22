const router = require('express').Router();
const controller = require('../controller/controller.js');

router.route('/messages/:username')
// This route returns all messages that are relevant to one user for when the app is started
.get(controller.getMessagesByUser) 
// This route deletes all messages by one user. It does not currently delete entries in the conversations table
.delete(controller.deleteAllByUser); 

router.route('/deletemessage')
//this route allows user to delete a message that they made, but should not allow deletion of any others. Takes a message id
.delete(controller.deleteSingleMessage);

router.route('/modifyconversation') 
//Posting to this route adds a conversation
.post(controller.addConversation)
//Deleting to this route deletes a single conversation
.delete(controller.deleteConversation);

router.route('/profiles/createnew') 
//This route allows new profiles to be posted
.post(controller.addProfile);

router.route('/profiles/:username')
//this route allows you to grab a particular profile
.get(controller.getProfile)
//and this one will delete one
.delete(controller.deleteProfile);

module.exports = router;