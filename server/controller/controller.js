const DB = require('../../DB/db.js');

//Goes to all the places required and fetches all messages that pertain to a single user
//(To be used on signin). It also sends back the user Id and a table of users that 
// you are having conversations with so that the client can sort the data more easily.
module.exports.getMessagesByUser = (req, res) => {
  const username = req.params.username;
  let convoArray = [];
  let convoIdArray = [];
  let usersToHash = [];
  DB.User.findAll({
    where: { username, }
  }).then((user) => {
    userId = user[0].id;
    DB.Conversation.findAll({
      where: { firstUser: user[0].id },
      raw: true
    }).then((conversations) => {
      conversations.forEach((one) => {
        convoArray.push(one);
        usersToHash.push(one.secondUser);
      });
      DB.Conversation.findAll({
        where: { secondUser: user[0].id },
        raw: true
      }).then((conversations) => {
        conversations.forEach((one) => {
          convoArray.push(one)
          usersToHash.push(one.firstUser);
        });
        convoArray.forEach((conversation) => {
          convoIdArray.push(conversation.id);
        });
        DB.Message.findAll({
          where: { conversationId: convoIdArray },
          raw: true
        }).then((messages) => {
          let conversationKey = {};
          DB.User.findAll({
            where: { id: usersToHash },
            raw: true
          }).then((users) => {
            convoIdArray = convoIdArray.sort();
            for (let i = 0; i < convoIdArray.length; i++) {
              if (convoIdArray[i] === convoIdArray[i+1]) {
                convoIdArray.splice(i, 1);
              }
            }
            users.forEach((user) => conversationKey[user.id] = user.username);
            messages.forEach((message) => message.userId = conversationKey[message.userId]);
            let usernameArray = [];
            for (let key in conversationKey) {
              usernameArray.push(conversationKey[key]);
            }
            res.status(200).json({
              messages: messages,
              usernameArray: usernameArray
            });
          });
        });
      });
    });
  });
};

//This function adds new messages to the database with the correct userId and conversationId
//when an otherUser property is provided along with text
//it cannot make a post if there is not already an open conversation
module.exports.postMessage = (req, res) => {
  const username = req.params.username;
  let userIds = [];
  let sortedIds = [];
  DB.User.findOne({
    where: { username, }
  }).then((userId) => {
    userIds.push(userId.id);
    DB.User.findOne({
      where: { username: req.body.otherUser }
    }).then((userId) => {
      userIds.push(userId.id);
      userIds.forEach((id) => sortedIds.push(id));
      sortedIds.sort();
    }).then((both) => {
      DB.Conversation.findOne({
        where: { 
          firstUser: sortedIds[0],
          secondUser: sortedIds[1]
        }
      }).then((conversation) =>{
        if (conversation !== null) {
          DB.Message.create({
            text: req.body.text,
            userId: userIds[0],
            conversationId: conversation.id
          }).then((message) => {
            res.status(201).json(message);
          }).catch((err) => {
            res.status(404).json(message);
          });
        } else {
          res.status(404).json('this conversation does not exist');
        }
      });
    });
  });
};

//This method delets all messages by a single user. At present, it does not delete the record of 
//the conversation in the Conversations table.
//TODO: Possibly make it delete all in these conversations.
module.exports.deleteAllByUser = (req, res) => {
  const username = req.params.username;
  DB.User.destroy({
    where: { username, }
  }).then((destroyed) => {
    res.status(204).json(destroyed);
  }).catch((err) => {
    res.status(404).json(err);
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

//gets profiles by location
module.exports.getByLocation = (req, res) => {
  let location = req.params.location;
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

//This adds a conversation to the Conversation table given 2 users sent on the 
//body of an object that are given by name
module.exports.addConversation = (req, res) => {
  let userToAdd1 = 0;
  let userToAdd2 = 0;
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
        DB.Conversation.findOne({
          where: {
            firstUser: userToAdd1,
            secondUser: userToAdd2
          }
        }).then((found) => {
          if (found) {
            res.json(found);
          } else {
            DB.Conversation.create({
              firstUser: userToAdd1,
              secondUser: userToAdd2
            }).then((newConversation) => {
              res.status(201).json(newConversation);
            }).catch((err) => {
              res.status(404).json(err);
            });
          }
        });
      } else {
        DB.Conversation.findOne({
          where: {
            firstUser: userToAdd2,
            secondUser: userToAdd1
          }
        }).then((found) => {
          if(found) {
            res.json(found);
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
      }
    });
  });
};

//This deletes a conversation from the Conversation table and 
//deletes all associated messages from the messages table
module.exports.deleteConversation = (req, res) => {
  let userIds = [];
  DB.User.findAll({
    where: { username: req.body.firstUser }
  }).then((user1) => {
    userIds.push(user1[0].id);
    DB.User.findAll({
      where: { username: req.body.secondUser }
    }).then((user2) => {
      userIds.push(user2[0].id);
      sorter = (a, b) => {
        if (a < b) {
          return -1;
        }
        if (b < a) {
          return 1;
        }
        return 0;
      }
      userIds = userIds.sort(sorter);
      DB.Conversation.findOne({
        where: {
          firstUser: userIds[0],
          secondUser: userIds[1]
        },
        raw: true
      }).then((destruction) => {
        console.log(destruction)
        DB.Message.destroy({
          where: { conversationId: destruction.id }
        }).then((moreDestruction) => {
          DB.Conversation.destroy({
            where: { id: destruction.id }
          }).then((done) => {
            res.status(204).json('conversations destroyed');
          }).catch((err) => {
            res.status(404).json(err);
          });
        });
      });
    });
  });
};

//This method returns a conversation when given a conversation id in the params
module.exports.getConvobyId = (req, res) => {
  let convoToSend;
  let id1;
  let id2;
  DB.Conversation.findOne({
    where: { id: req.params.id },
    raw: true
  }).then((convo) => {
    convoToSend = convo;
    id1 = convo.firstUser;
    id2 = convo.secondUser;
    DB.User.findOne({
      where: { id: id1 }
    }).then((user1) => {
      id1 = user1.username;
      DB.User.findOne({
        where: { id: id2 }
      }).then((user2) => {
        id2 = user2.username;
        convoToSend.firstUser = id1;
        convoToSend.secondUser = id2;
        res.json(convoToSend);
      });
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
    rating: req.body.rating,
    isLocal: req.body.isLocal,
    imageUrl: req.body.imageUrl,
  }).then((newUser) => {
    res.status(201).json(newUser);
  }).catch((err) => {
    res.status(404).json(err);
  });
};

//This method fetchs a single profile given a userName
module.exports.getProfile = (req, res) => {
  const username = req.params.username;
  DB.User.findOne({
    where: { username, }
  }).then((profile) => {
    res.status(200).json(profile);
  }).catch((err) => {
    res.status(404).json(err);
  });
};

module.exports.changeProfile = (req, res) => {
  const username = req.body.username.replace(' ', '_');
  DB.User.findOne({
    where: { username, }
  }).then((profile) => {
    profile.update({
      location: req.body.location,
      biography: req.body.biography,
      isLocal: req.body.isLocal
    }).then((user) => {
      res.status(201).json(user);
    }).catch((err) => {
      res.status(404).json(err);
    });
  });
};

//This method deletes a profile based on a username
//All messages belonging to this user are deleted automatically on cascade
module.exports.deleteProfile = (req, res) => {
  const username = req.params.username;
  DB.User.destroy({
    where: { username, }
  }).then((done) => {
    res.status(204).json('profile deleted');
  });
};

module.exports.addRatingToUser = (req, res) => {
  const username = req.params.username;
  const newRating = req.body.inputRating; 
  DB.User.findOne({ where: { username,} })
    .then((profile) => {
      profile.update({
        rating: newRating,
      })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res.status(404).json(err);
      });
    });
};