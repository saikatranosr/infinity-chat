import { Server } from 'socket.io'

let users = {};
let lastOnline;
const ioHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("IO Hnadler connected")
    const io = new Server(res.socket.server)

    io.on('connection', socket =>{
        // If any new user joins, let other users connected to the server know!
        socket.on('new-user-joined', name =>{ 
            socket.emit('welcome', users);
            users[socket.id] = {name: name, info: ['online']};
            console.log(name + " Joined the Chat")
            console.log(users)
            // console.log(users)
            socket.broadcast.emit('user-joined', {id: socket.id, name: name} );
        });
    
        // If someone sends a message, broadcast it to other people
        socket.on('send', ({message, msgId, timeStamp}) =>{
            console.log(socket.id)
            try{
                socket.broadcast.emit('receive', {message, name: users[socket.id]['name'], msgId, timeStamp, senderId: socket.id});
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
              users[socket.id].info = 'online';
            }
            catch{
              console.log('err');
            }
        });
        
        socket.on('offline', () =>{
          let myDate = new Date();
          lastOnline = myDate.getUTCHours()*60 + myDate.getUTCMinutes();
          socket.broadcast.emit('user-offline', {id: socket.id, info: lastOnline});
          try{
            users[socket.id].info = lastOnline;
          }
          catch{
            console.log('err');
          }
        });
            
        socket.on('delete', id => socket.broadcast.emit('user-delete', id));
        
    });
    
    res.socket.server.io = io
    
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler