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
	userId: {
		type: Sequelize.INTEGER,
		model: 'user',
		key: 'id'
	},
	conversationId: {
		type: Sequelize.INTEGER,
		model: 'conversation',
		key: 'id'
	}
});

const Conversation = DB.define('conversation', {
	firstUser: {
		type: Sequelize.INTEGER,
		model: 'user',
		key: 'id'
	},
	secondUser: {
		type: Sequelize.INTEGER,
		model: 'user',
		key: 'id'
	}
});

User.hasMany(Message, { onDelete: 'cascade' });
Message.belongsTo(User, { onDelete: 'cascade' });

Conversation.belongsTo(User, { onDelete: 'cascade' });
User.hasMany(Conversation, { onDelete: 'cascade' });


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
		}).then(() => {
			return User.create({
				username: 'Max',
				location: 'Portland',
				biography: 'Another bio'
			}).then(() => {
				return User.create({
					username: 'Tiffany',
					location: 'Los Angeles',
					biography: 'yet another one'
				});
			});
		});
	});
});

Message.sync({ force: true }).then(() => {
	return Message.create({
		text: 'a new message',
		userId: 1,
		conversationId: 1
	}).then(() => {
		return Message.create({
			text: 'another new message',
			userId: 2,
			conversationId: 2
		}).then(() => {
			Message.create({
				text: 'yet another one',
				userId: 3,
				conversationId: 3
			});
		});
	});
});

Conversation.sync({ force: true }).then(() => {
	return Conversation.create({
		firstUser: 1,
		secondUser: 2
	}).then(() => {
		return Conversation.create({
			firstUser: 2,
			secondUser: 1
		}).then(() => {
			return Conversation.create({
				firstUser: 3,
				secondUser: 4
			});
		});
	});
});

module.exports = {
	DB,
	User,
	Message,
	Conversation
};







