const Sequelize = require('sequelize');

const DB = new Sequelize('localHostDB', 'Alex', '', {
	dialect: 'sqlite',
	storage: 'db/localhost.sqlite'
});

DB.authenticate()
.then(() => {
	console.log('Connection to database has been established');
})
.catch((err) => {
	console.error('Unable to connect to the database', err);
});

const User = DB.define('user', {
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	location: {
		type: Sequelize.STRING,
		allowNull: false
	},
	biography: {
		type: Sequelize.STRING,
		allowNull: false
	}
});


const Message = DB.define('message', {
	text: {
		type: Sequelize.STRING,
		allowNull: false
	},
	user_id: {
		type: Sequelize.INTEGER,
		model: 'users',
		key: 'id'
	},
	conversation_id: {
		type: Sequelize.INTEGER,
		model: 'conversations',
		key: 'id'
	}
});

const Conversation = DB.define('conversation', {
	user_id_1: {
		type: Sequelize.INTEGER,
		model: 'users',
		key: 'id'
	},
	user_id_2: {
		type: Sequelize.INTEGER,
		model: 'users',
		key: 'id'
	}
});

User.hasMany(Message);
Message.belongsTo(User);

Conversation.belongsTo(User);
User.hasMany(Conversation);

Message.belongsTo(Conversation);
Conversation.hasMany(Message);

User.sync({ force: true }).then(() => {
	return User.create({
		username: 'Alex',
		location: 'Santa Monica',
		biography: 'some stuff about me'
	}).then(() => {
		return User.create({
			username: 'Jeff',
			location: 'North Hollywood',
			biography: 'Some other stuffs'
		});
	});
});

Message.sync({ force: true }).then(() => {
	return Message.create({
		text: 'a new message',
		user_id: 1
	}).then(() => {
		return Message.create({
			text: 'another new message',
			user_id: 2
		});
	});
});

Conversation.sync({ force: true }).then(() => {
	return Conversation.create({
		user_id_1: '1',
		user_id_2: '2'
	}).then(() => {
		return Conversation.create({
			user_id_1: '2',
			user_id_2: '1'
		})
	})
});

module.exports = {
	DB,
	User,
	Message,
	Conversation
};







