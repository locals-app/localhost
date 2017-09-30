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



User.sync({ force: true }).then(() => {
  return User.create({
    username: 'David_Leigh',
    location: 'Santa Monica',
    biography: 'some stuff about me',
    rating: '[3.5, 4.5, 1.5, 3]',
    isLocal: false,
    imageUrl: 'http://i.telegraph.co.uk/multimedia/archive/02002/Larry_david_2002589b.jpg'
  }).then(() => {
    return User.create({
      username: 'Jeff_The_Benevolent_Dictator',
      location: 'North Hollywood',
      biography: 'Some other ghosts n stuffs',
      rating: '[3.5, 1.5, 1.5, 3]',
      isLocal: false,
      imageUrl: 'https://pbs.twimg.com/profile_images/620774262329085952/F_7Gn6Ji.jpg',
    }).then(() => {
      return User.create({
        username: 'Max_Jacobs',
        location: 'Portland',
        biography: 'Another bio',
        rating: '[3.5, 4.5, 1.5, 4]',
        isLocal: true,
        imageUrl: 'https://scontent.xx.fbcdn.net/v/t31.0-1/20776604_10154853781141662_4297692357582205900_o.jpg?oh=c8bd95f05e0a9b1f1891b13fdcc4da9f&oe=5A552F7F'
      }).then(() => {
        return User.create({
          username: 'Tiffany_Wang',
          location: 'Los Angeles',
          biography: 'yet another one',
          rating: '[3.5, 1.5, 3.5, 4]',
          isLocal: false, 
          imageUrl: 'https://images.sunfrogshirts.com/2016/03/07/It-is-a-TIFFANY-Thing--TIFFANY-Last-Name-Surname-T-Shirt-Black-front.jpg'
        }).then(() => {
          Conversation.sync({ force: true }).then(() => {
            return Conversation.create({
              firstUser: 1,
              secondUser: 3
            }).then(() => {
              return Conversation.create({
                firstUser: 2,
                secondUser: 3
              }).then(() => {
                return Conversation.create({
                  firstUser: 3,
                  secondUser: 4
                }).then(() => {
                  return Conversation.create({
                    firstUser: 1,
                    secondUser: 4            
                  }).then(() => {
                    Message.sync({ force: true }).then(() => {
                      return Message.create({
                        text: 'From Alex to Max',
                        userId: 1,
                        conversationId: 1
                      }).then(() => {
                        return Message.create({
                          text: 'Hi Alex!',
                          userId: 3,
                          conversationId: 1
                        }).then(() => {
                          Message.create({
                            text: 'Hey Max!',
                            userId: 1,
                            conversationId: 1
                          }).then(() => {
                            return Message.create({
                              text: 'From Jeff to Max',
                              userId: 2,
                              conversationId: 2
                            }).then(() => {
                              return Message.create({
                                text: 'Hi Jeff!',
                                userId: 3,
                                conversationId: 2
                              }).then(() => {
                                Message.create({
                                  text: 'Hi Max!',
                                  userId: 2,
                                  conversationId: 2
                                }).then(() => {
                                  return Message.create({
                                    text: 'From Tiffany to Max',
                                    userId: 4,
                                    conversationId: 3
                                  }).then(() => {
                                    return Message.create({
                                      text: 'Hi Tiffany!',
                                      userId: 3,
                                      conversationId: 3
                                    }).then(() => {
                                      return Message.create({
                                        text: 'Hi Max!',
                                        userId: 4,
                                        conversationId: 3
                                      }).then(() => {
                                        return Message.create({
                                          text: 'Hi Tiffany',
                                          userId: 1,
                                          conversationId: 4
                                        }).then(() => {
                                          return Message.create({
                                            text: 'Hi Alex',
                                            userId: 4,
                                            conversationId: 4
                                          });
                                        });
                                      });
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
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







