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
const port = process.env.PORT || 3000
// MY VARIABLES
let users = {};

// CREATING SERVER
app.get('/', (req, res)=>{
	res.render('index');
});

// REAL TIME CHAT FEATURES
io.on('connection', socket =>{
    // If any new user joins, let other users connected to the server know!
    socket.on('new-user-joined', name =>{ 
        users[socket.id] = {name: name, info: ['online']};
        // console.log(users)
        socket.broadcast.emit('user-joined', {id: socket.id, name: name} );
        socket.emit('welcome', {obj: users, myId: socket.id});
    });

    // If someone sends a message, broadcast it to other people
    socket.on('send', (message, msgId) =>{
        try{
            socket.broadcast.emit('receive', {message: message, name: users[socket.id]['name'], id: msgId, sender: socket.id});
            socket.emit('sent', msgId);
        }
        catch{
            socket.emit('alert', "Your message couldn't be send, You are disconnected.")
        }
    });

    // If someone leaves the chat, let others know 
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', socket.id);
        delete users[socket.id];
        // console.log(users)
    });
    
    socket.on('typing', () => {
        socket.broadcast.emit('user-typing', socket.id);
    });
    
    socket.on('online', () =>{
        socket.broadcast.emit('user-online', socket.id);
        try{
          users[socket.id].info = ['online'];
        }
        catch{
          console.log('err');
        }
    });
    
    socket.on('offline', () =>{
      let myDate = new Date();
      lastOnline = `${(myDate.getHours()<10?'0':'')+(myDate.getHours())}:${(myDate.getMinutes()<10?'0':'')+(myDate.getMinutes())}`
      socket.broadcast.emit('user-offline', {id: socket.id, time: lastOnline});
      try{
        users[socket.id].info = ['offline', lastOnline];
      }
      catch{
        console.log('err');
      }
    });
        
    
});

// Starting server
server.listen(port, () => {
  console.log('listening on *: '+port);
});