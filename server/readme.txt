How to use the different routes to the API:


Route: /api/messages/:username

A GET request to /api/messages/:username:

This returns an array containing messages in this format: 
[
    {
        "id": 1,
        "text": "a new message",
        "userId": "Alex",
        "conversationId": 1,
        "createdAt": "2017-09-23T23:25:58.057Z",
        "updatedAt": "2017-09-23T23:25:58.057Z"
    },
    {
        "id": 2,
        "text": "another new message",
        "userId": "Jeff",
        "conversationId": 1,
        "createdAt": "2017-09-23T23:25:58.131Z",
        "updatedAt": "2017-09-23T23:25:58.131Z"
    }
]

Each pair of users only has one conversation id

A POST request to the same route requires an object in this format:

{
   "otherUser": "Alex",
   "text": "hello"
}

Please note that this will only successfully send a new message if a conversation already exists between 2 users.

It returns:
{
    "id": 4,
    "text": "hello",
    "userId": 2,
    "conversationId": 1,
    "updatedAt": "2017-09-23T23:29:17.970Z",
    "createdAt": "2017-09-23T23:29:17.970Z"
}

A delete request to this route deletes all messages by the given user. It does not delete the record of the conversation from the conversations table

Route: /api/deletemessage

a DELETE request to this route deletes a single message given a single Id.

the format for the request: 
{
   "id": 3
}

This does not return anything

Route: api/:location

a GET request returns all users matching the location property given

Route: /api/modifyconversation:

A POST to this route adds a new  conversation
the format: 
{
   "firstUser": "Jeff",
   "secondUser": "Tiffany"
}

it returns: 
{
    "id": 4,
    "firstUser": 2,
    "secondUser": 4,
    "updatedAt": "2017-09-23T23:37:09.122Z",
    "createdAt": "2017-09-23T23:37:09.122Z",
}

Route: /api/getconvobyid/:id

A GET request to this route returns an object that contains the usernames of both users in a particular conversation.

A DELETE request to this route deletes a single conversation and all associated messages
it requires: 
{
   "firstUser": "Jeff",
   "secondUser": "Alex"
}

Route: /api/profiles/createnew

A POST request to this route creates a new profile

it requires the following format: 
{
    "username": "Rob",
    "location": "Santa Monica",
    "biography": "some stuff about me",
    "isLocal": "false",
    "rating": 5
}
it outputs: 
{
    "id": 5,
    "username": "Rob",
    "location": "Santa Monica",
    "biography": "some stuff about me",
    "rating": null,
    "isLocal": false,
    "updatedAt": "2017-09-23T23:47:07.329Z",
    "createdAt": "2017-09-23T23:47:07.329Z"
}
Route: /api/proiles/:username

A GET request to this route returns a single profile

A PUT request to this route makes changes to the profile
it requires: {
    "location": "Elseware",
    "biography": "some stuff about me",
    "isLocal": "false"
}

it outputs:
{
    "id": 1,
    "username": "Alex",
    "location": "Elseware",
    "biography": "some stuff about me",
    "rating": null,
    "isLocal": false,
    "createdAt": "2017-09-23T23:49:52.578Z",
    "updatedAt": "2017-09-23T23:49:57.228Z"
}

a DELETE request to this route will delete a profile and all messages belonging to it.







