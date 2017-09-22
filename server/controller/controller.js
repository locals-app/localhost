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
  				where: { conversationId: convoIdArray }
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

module.exports.deleteSingleMessage = (req, res) => {
	DB.Message.destroy({
		where: { id: req.body.id }
	}).then((done) => {
		res.status(204).json('message deleted');
	}).catch((err) => {
		res.status(404).json(err);
	})
}

module.exports.deleteAllByUser = (req, res) => {
	const username = req.path.substr(req.path.lastIndexOf('/') + 1);
	let userIdDelete;
  DB.User.destroy({
  	where: { username, }
  }).then((destroyed) => {
  	res.status(204).json(destroyed);
  }).catch((err) => {
  	res.status(404).json(err);
  });
};

module.exports.deleteConversation = (req, res) => {
	let userIds = [];
	let convosToDelete = [];
	DB.User.findAll({
		where: { username: req.body.firstUser }
	}).then((user1) => {
		userIds.push(user1[0].id);
		DB.User.findAll({
			where: { username: req.body.secondUser }
		}).then((user2) => {
			userIds.push(user2[0].id);
			DB.Conversation.findOne({
				where: {
					firstUser: userIds[0],
					secondUser: userIds[1]
				}
			}).then((convo1) => {
				convosToDelete.push(convo1.id);
				DB.Conversation.findOne({
					where: {
						firstUser: userIds[1],
						secondUser: userIds[0]
					}
				}).then((convo2) => {
					convosToDelete.push(convo2.id);
				}).then((destruction) => {
					DB.Message.destroy({
						where: { conversationId: convosToDelete }
					}).then((moreDestruction) => {
						DB.Conversation.destroy({
							where: { id: convosToDelete }
						}).then((done) => {
						  res.status(204).json('conversations destroyed');
						}).catch((err) => {
							res.status(404).json(err);
						});
					});
				});
			});
		});
	});
};

module.exports.addConversation = (req, res) => {
	let userToAdd1;
	let userToAdd2;
	DB.User.findOne({
		where: { userName: req.body.firstUser }
	}).then((user1) => {
		userToAdd1 = user1.id;
		DB.User.findOne({
			where: { username: req.body.secondUser}
		}).then((user2) => {
			userToAdd2 = user2.id;
		}).then((bothUsers) => {
			DB.Conversation.create({
				firstUser: userToAdd1,
				secondUser: userToAdd2
			}).then((newConversation) => {
				res.status(201).json(newConversation);
			}).catch((err) => {
				res.status(404).json(err);
			});
		});
	});
}

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

module.exports.getProfile = (req, res) => {
	const username = req.path.substr(req.path.lastIndexOf('/') + 1);
	DB.User.findOne({
		where: { username: username }
	}).then((profile) => {
		res.status(200).json(profile);
	}).catch((err) => {
		res.status(404).json(err);
	});
};

module.exports.deleteProfile = (req, res) => {
	const username = req.path.substr(req.path.lastIndexOf('/') + 1);
	DB.User.destroy({
		where: { username, }
	}).then((done) => {
		res.status(204).json('profile deleted');
	});
};



