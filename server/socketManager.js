const io = require('./socketSandbox').io;

const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('./socketEvents');

const { createUser, createMessage, createChat } = require('./socketFactories');

const connectedUser = {};

module.exports = function(socket) {
  console.log('socket id' + socket.id);
};

//verify user
socket.on(VERIFY_USER, (nickname, callback) => {
  if (isUser(connectedUser, nickname)) {
      console.log('not cre')
    callback({ isUser: true, user: null });
  } else {
      console.log('created')
    callback({ isUser: false, user: createUser({ name: nickname }) });
  }
});

socket.on(USER_CONNECTED, (user) => {

})


function addUser(userList, user) {
  let newList = Object.assign({}, userList);
  newList[user.name] = user;
  return newList;
}

function removeUser(userList, username) {
  let newList = Object.assign({}, userList);
  delete newList[username];
  return newList;
}

function isUser(userList, username) {
  return username in userList;
}
