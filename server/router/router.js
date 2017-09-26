const router = require('express').Router();
const controller = require('../controller/controller.js');
const server = require('../server');
const path = require('path');
const cors = require('cors');
const jwt = require('express-jwt');

//TODO : add a route for posting to ratings
const authCheck = jwt({
  secret: new Buffer('Vwx3MnEbWbwwYMJ9WzeaqVXXbk0bABOhVbhaUM9uApzwF-uV3FRNUGI63D2HscNx', 'base64'),
  audience: 'kaQTBjg6m1VWXujuWrjYNDahHpDyJBEk'
});

//router.route('/messages/:username')
// This route returns all messages that are relevant to one user for when the app is started
router.get('/messages/:username', authCheck, controller.getMessagesByUser) 
//This route posts a single message to the database. A recipient property needs to be found on the body
//and needs to be called "otherUser". The message must also have a text property
//It finds the conversation Id and puts in all pertinent information to the message entry
router.post('/messages/:username', authCheck, controller.postMessage)
// This route deletes all messages by one user. It does not currently delete entries in the conversations table
router.delete('/messages/:username', authCheck, controller.deleteAllByUser); 

router.route('/deletemessage')
//this route allows user to delete a message that they made, but should not allow deletion of any others. Takes a message id
.delete(controller.deleteSingleMessage);

router.route('/:location')
//This route should return all profiles in a given location. If there is a space in the city, camel casing should be used in url.
//The camel casing will be turned into spaces in the controller.
.get(controller.getByLocation);

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
.put(controller.changeProfile)
//and this one will delete one
.delete(controller.deleteProfile);

module.exports = router;