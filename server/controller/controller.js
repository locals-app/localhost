const DB = require('../../DB/db.js');


module.exports.getMessagesByUser = (req, res) => {
  const username = req.path.substr(req.path.lastIndexOf('/') + 1);
  DB.User.findAll({
  	where: { username: username }
  }).then((person) => {
  	DB.Message.findAll({
  		where: { user_id: person[0].id }
  	})
  	.then((results) => {
  		console.log();
  		res.status(200).json(results);
  	})
  	.catch((err) => {
  		res.status(404).json(err);
  	});
  });
};

module.exports.deleteAllByUser = (req, res) => {
	const username = req.path.substr(req.path.lastIndexOf('/') + 1);
	let userIdDelete;
  DB.User.findAll({
  	where: { username: username }
  })
  .then((user) => {
  	userIdToDelete = user;
  }).then((user) => {
  	DB.User.destroy({
  		where: {
  			username: username
  		}
  	}).then((user) => {
  		DB.Message.destroy({
  			where: user.id
  		}).then((user) => {
  			DB.Conversation.destroy({
  				where: user.id
  			}).then((data) => {
  				res.status(204).json(data)
  			}).catch((err) => {
  				res.status(404).json(err);
  			})
  		})
  	})
  })
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
}



