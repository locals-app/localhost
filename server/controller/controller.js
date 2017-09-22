const DB = require('../../DB/db.js');


module.exports.getMessagesByUser = (req, res) => {
  const username = req.path.substr(req.path.lastIndexOf('/') + 1)
  DB.User.findAll({
  	where: { username: username }
  }).then((person) => {
  	DB.Message.findAll({
  		where: person.id
  	})
  	.then((results) => {
  		res.status(200).json(results);
  	})
  	.catch((err) => {
  		console.log(err);
  	});
  });
};

module.exports.deleteAllByUser = (req, res) => {

}