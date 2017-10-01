const Sequelize = require('sequelize');
const dbUrl = require('./elephantUrl.js');

//this initializes the database.
const DB = new Sequelize(dbUrl, {
  dialect: 'pg',
});

//This initializes and authenticates the database
DB.authenticate()
.then(() => {
  console.log('Connection to database has been established');
})
.catch((err) => {
  console.error('Unable to connect to the database', err);
});

//Defines the User model which will essentially hold profile information. 
//TODO: more items may be added to this model:
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
  },
  rating: {
    type: Sequelize.STRING
  },
  isLocal: {
    type: Sequelize.BOOLEAN
  },
  imageUrl: {
    type: Sequelize.STRING
  }
});

//Defined the message model that has tow foreign keys: A userId corresponding to 
//the Users table and a conversationId corresponding to the conversations table: 
const Message = DB.define('message', {
  text: {
    type: Sequelize.STRING,
    allowNull: false
  },
  userId: {
    type: Sequelize.INTEGER,
    model: 'users',
    key: 'id'
  },
  conversationId: {
    type: Sequelize.INTEGER,
    model: 'conversations',
    key: 'id'
  }
});

//This is the the conversations table. Both properties are forein keys each relating to the Users table:
const Conversation = DB.define('conversation', {
  firstUser: {
    type: Sequelize.INTEGER,
    model: 'users',
    key: 'id'
  },
  secondUser: {
    type: Sequelize.INTEGER,
    model: 'users',
    key: 'id'
  }
});

//These lines establish the relationship between the Users table and the Messages table:
User.hasMany(Message, { onDelete: 'cascade' });
Message.belongsTo(User, { onDelete: 'cascade' });

Message.belongsTo(Conversation, { onDelete: 'cascade' });

//These lines establish the relationship between the Users table and the Conversations table:
User.hasMany(Conversation, { onDelete: 'cascade' });
Conversation.belongsTo(User, { onDelete: 'cascade' });



User.sync().then(() => {
  Message.sync().then(() => {
    Conversation.sync();
  });
});


//This syncs the Conversations table and then seeds some data


//This syncs the Users table and then adds some seed data


//Exports the different model
module.exports = {
  DB,
  User,
  Message,
  Conversation
};







