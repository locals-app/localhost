const DB = require('../../DB/db.js');


module.exports.getMessagesByUser = (req, res) => {
  const username = req.path.substr(req.path.lastIndexOf('/') + 1);
  let convoArray = [];
  DB.User.findAll({
  	where: { username, }
  }).then((user) => {
  	DB.Conversation.findAll({
  		where: { firstUser: user[0].id }
  	}).then((conversations) => {
  		conversations.forEach((one) => convoArray.push(one));
  		DB.Conversation.findAll({
  			where: { secondUser: user[0].id }
  		}).then((moreConversations) => {
  			moreConversations.forEach((one) => convoArray.push(one));
  			res.json(convoArray);
  		})
  	})
  })
  	
  
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



