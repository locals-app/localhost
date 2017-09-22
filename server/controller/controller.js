const DB = require('../../DB/db.js');


module.exports.getMessagesByUser = (req, res) => {
  const username = req.path.substr(req.path.lastIndexOf('/') + 1);
  let userId;
  let convoArray = [];
  let convoIdArray = [];
  DB.User.findAll({
  	where: { username, }
  }).then((user) => {
  	userId = user[0].id;
  	DB.Conversation.findAll({
  		where: { firstUser: user[0].id }
  	}).then((conversations) => {
  		conversations.forEach((one) => convoArray.push(one));
  		DB.Conversation.findAll({
  			where: { secondUser: user[0].id }
  		}).then((conversations) => {
  			conversations.forEach((one) => convoArray.push(one));
  			convoArray.forEach((conversation) => {
  				convoIdArray.push(conversation.id);
  			})
  			DB.Message.findAll({
  				where: { conversationId:convoIdArray }
  			}).then((messages) => {
  				res.status(200).json({
  					yourUserId: userId, 
  					messages: messages
  				});
  			}).catch((err) => {
  				res.status(404).json(err);
  			});
  		});
  	});
  });
};

module.exports.deleteAllByUser = (req, res) => {
	const username = req.path.substr(req.path.lastIndexOf('/') + 1);
	let userIdDelete;
  DB.User.destroy({
  	where: { username,}
  }).then((destroyed) => {
  	res.json(destroyed);
  }).catch((err) => {
  	res.status(404).json(err);
  });
};

module.exports.addProfile = (req, res) => {
	DB.User.create({
		username: req.body.username,
		location: req.body.location,
		biography: req.body.biography
	}).then((newUser) => {
		res.status(201).json(newUser);
	}).catch((err) => {
		res.status(404).json(err);
	});
};



