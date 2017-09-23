const router = require('express').Router();
const controller = require('../controller/controller.js');

//TODO : add a route for posting to ratings

router.route('/messages/:username')
// This route returns all messages that are relevant to one user for when the app is started
.get(controller.getMessagesByUser) 
//This route posts a single message to the database. A recipient property needs to be found on the body
//and needs to be called "otherUser". The message must also have a text property
//It finds the conversation Id and puts in all pertinent information to the message entry
.post(controller.postMessage)
// This route deletes all messages by one user. It does not currently delete entries in the conversations table
.delete(controller.deleteAllByUser); 

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