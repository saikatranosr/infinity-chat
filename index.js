// Node server which will handle socket io connections
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
app.use(express.static(__dirname +'/static'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
 
// MY VARIABLES
const users = {};

// CREATING SERVER
app.get('/', (req, res)=>{
	res.render('index');
});

// REAL TIME CHAT FEATURES
io.on('connection', socket =>{
    // If any new user joins, let other users connected to the server know!
    socket.on('new-user-joined', name =>{ 
        users[socket.id] = name;
        console.log(users)
        socket.broadcast.emit('user-joined', users);
        socket.emit('receive-names', users);
    });

    // If someone sends a message, broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    // If someone leaves the chat, let others know 
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})

// Starting server
server.listen(3000, () => {
  console.log('listening on *:3000');
});