const socket = io();

socket.emit('new-user-joined', name);

// Welcome a user when welcome him/her and takes the users object and show.
socket.on('welcome', e => {
    users = e;
    console.log(users)
    appendMessage('', `${name}, Welcome to Infinity Chat.`, 'center')
    appendUser.renderAll()
});

// If a new user joins, receive his/her name from the server
socket.on('user-joined', e =>{
    appendMessage('', `${e.name} joined the chat`, 'center')
    users[e.id] = {}
    users[e.id].name = e.name;
    users[e.id].info = ['online'];
    console.log(users);
    appendUser.appendFoo({idKey: e.id, name: e.name, info: ['online']})
})

// If server sends a message, receive it
socket.on('receive', data =>{
    appendMessage(data.name, data.message, 'left')
});

// If a user leaves the chat, append the info to the container
socket.on('left', id =>{
    appendMessage('', `${users[id].name} left the chat`, 'center')
    delete users[id];
    appendUser.removeUser(id)
});

// If someone disconnected from server let him know
socket.on('disconnect', function(){
    alert("You lost connection!, reload to connect again")
});