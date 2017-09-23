const DB = require('../../DB/db.js');

//TODO : change all urls to req.params 
//TODO : try to make the sendAll function send messages with usernames;
//TODO : add rating to database and profiles functions
//TODO : add a way to add a rating to profiles

//Goes to all the places required and fetches all messages that pertain to a single user
//(To be used on signin). It also sends back the user Id and a table of users that 
// you are having conversations with so that the client can sort the data more easily.
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
        });
        DB.Message.findAll({
          where: { conversationId: convoIdArray },
          raw: true
        }).then((messages) => {
          usersToHash = [];
          let conversationKey = {};
          messages.forEach((message) => usersToHash.push(message.id));
          DB.User.findAll({
            where: { Id: usersToHash },
            raw: true
          }).then((users) => {
            users.forEach((user) => conversationKey[user.id] = user.username);
            messages.forEach((message) => message.userId = conversationKey[message.userId]);
            console.log(messages);
            res.status(200).json(messages);
          });
        });
      });
    });
  });
};

//This function adds new messages to the database with the correct userId and conversationId
//when an otherUser property is provided along with text
module.exports.postMessage = (req, res) => {
  console.log(req.params);
  const username = req.path.substr(req.path.lastIndexOf('/') + 1);
  let userIds = [];
  let conversationsBetween2 = [];
  DB.User.findOne({
    where: { username, }
  }).then((userId) => {
    userIds.push(userId.id);
    DB.User.findOne({
      where: { username: req.body.otherUser }
    }).then((userId) => {
      userIds.push(userId.id);
    }).then((both) => {
      DB.Conversation.findOne({
        where: { 
          firstUser: userIds[0],
          secondUser: userIds[1]
        }
      }).then((conversation1) =>{
        if (conversation1 !== null) {
          DB.Message.create({
            text: req.body.text,
            userId: userIds[0],
            conversationId: conversation1.id
          }).then((message) => {
            res.status(201).json(message);
          }).catch((err) => {
            res.status(404).json(message);
          });
        } else {
          DB.Conversation.findOne({
            where: { 
              firstUser: userIds[1],
              secondUser: userIds[0]
            }
          }).then((conversation2) => {
            if (conversation2 !== null) {
              DB.Message.create({
                text: req.body.text,
                userId: userIds[0],
                conversationId: conversation2.id
              }).then((message) => {
                res.status(201).json(message);
              }).catch((err) => {
                res.status(404).json(err);
              });
            }
          });
        }
      });
    });
  });
};

//This method is for going back and deleting a single message
module.exports.deleteSingleMessage = (req, res) => {
  DB.Message.destroy({
    where: { id: req.body.id }
  }).then((done) => {
    res.status(204).json('message deleted');
  }).catch((err) => {
    res.status(404).json(err);
  });
};

//This method delets all messages by a single user. At present, it does not delete the record of 
//the conversation in the Conversations table.
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

//gets profiles by location
module.exports.getByLocation = (req, res) => {
  let location = req.path.substr(req.path.lastIndexOf('/') + 1);
  location = location.split('');
  for (let i = 0; i < location.length; i++) {
    if (location[i] === '_') {
      location.splice(i, 1, ' ');
    }
  }
  location = location.join('');
  DB.User.findAll({
    where: { location, }
  }).then((users) => {
    res.status(200).json(users);
  }).catch((err) => {
    res.status(404).json(err);
  });
};

//This deletes a conversation from the Conversation table and deletes all associated messages from
//the messages table
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

//This adds a conversation to the Conversation table given 2 users sent on the 
//body of an object that are given by name
module.exports.addConversation = (req, res) => {
  let userToAdd1 = 0;
  let userToAdd2 = '';
  DB.User.findOne({
    where: { username: req.body.firstUser }
  }).then((user1) => {
    userToAdd1 = user1.id;
    DB.User.findOne({
      where: { username: req.body.secondUser}
    }).then((user2) => {
      userToAdd2 = user2.id;
    }).then((bothUsers) => {
      if (userToAdd1 < userToAdd2) {
        DB.Conversation.create({
          firstUser: userToAdd1,
          secondUser: userToAdd2
        }).then((newConversation) => {
          res.status(201).json(newConversation);
        }).catch((err) => {
          res.status(404).json(err);
        });
      } else {
        DB.Conversation.create({
          firstUser: userToAdd2,
          secondUser: userToAdd1
        }).then((newConversation) => {
          res.status(201).json(newConversation);
        }).catch((err) => {
          res.status(404).json(err);
        });
      }
    });
  });
};

//This method adds a new profile to the Users table
//TODO: if user properties are changed, update this method
module.exports.addProfile = (req, res) => {
  DB.User.create({
    username: req.body.username,
    location: req.body.location,
    biography: req.body.biography,
    rating: req.body.rating
  }).then((newUser) => {
    res.status(201).json(newUser);
  }).catch((err) => {
    res.status(404).json(err);
  });
};

//This method fetchs a single profile given a userName
module.exports.getProfile = (req, res) => {
  const username = req.path.substr(req.path.lastIndexOf('/') + 1);
  DB.User.findOne({
    where: { username, }
  }).then((profile) => {
    res.status(200).json(profile);
  }).catch((err) => {
    res.status(404).json(err);
  });
};

//This method deletes a profile based on a username
//All messages belonging to this user are deleted automatically on cascade
module.exports.deleteProfile = (req, res) => {
  const username = req.path.substr(req.path.lastIndexOf('/') + 1);
  DB.User.destroy({
    where: { username, }
  }).then((done) => {
    res.status(204).json('profile deleted');
  });
};



