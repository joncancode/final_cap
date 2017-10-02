'use strict';
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
  console.log(__dirname + " dir name");
});

// get the client to connect to the server with socket.io, responds in the console
io.on('connection', function(socket) {
  console.log('Client is connected on socket.js');

  
  socket.on('new user', function(data, callback) {
    if (usernames.indexOf(data) !== -1) {
      callback(false);
    } else {
      callback(true);
      socket.username = data;
      usernames.push(socket.username);
      updateUsernames();
    }
  });

  // Update usernames
  function updateUsernames() {
    io.sockets.emit('usernames', usernames);
  }

  // Send message
  socket.on('send message', function(data) {
    io.emit('send message', data);
  });

  // Disconnect event
  socket.on('disconnect', function(data) {
    if (!socket.username) {
      return;
    }
    usernames.splice(usernames.indexOf(socket.username), 1);
    updateUsernames;
  });
});

http.listen(process.env.PORT || 3400, function() {
  console.log('listening to server on *:3400');
});
