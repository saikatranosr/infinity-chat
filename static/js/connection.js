function connectIO(name){
const socket = io();

socket.emit('new-user-joined', name);

// Welcome a user when welcome him/her and takes the users object and show.
socket.on('welcome', e => {
    users = e.obj;
    delete users[e.myId]
    console.log(users)
    appendMessage('', `${name}, Welcome to Infinity Chat.`, 'center')
    appendUser.renderAll()
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();
    if (message.length !== 0){
  	  appendMessage('', message, 'right');
  	  socket.emit('send', message);
  	  messageInput.value = '';
    } else{
  	  messageInput.value = '';
      alert("Can not send empty message");
    }
	  messageInput.style.height = '25px';
	  if (mediaQuery.matches){
      mainContainer.style.gridTemplateRows = `40px 50px 1fr 50px`
    } else {
      mainContainer.style.gridTemplateRows = `40px 1fr 50px`;
    }
	  messageInput.focus();
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

socket.on('alert', e => {
    alert(e);
});

messageInput.addEventListener('input', ()=> {
    socket.emit('typing');
});

socket.on('user-typing', e => {
    appendUser.typing(e);
});

socket.on('user-online', e =>{
  appendUser.online(e);
  users[e].info = ['online'];
});

socket.on('user-offline', e =>{
  appendUser.offline(e);
  users[e.id].info = ['offline', e.time];
});

document.addEventListener("visibilitychange", function() {
  if (document.visibilityState == 'visible') {
    socket.emit('online');
  }
  else {
    socket.emit('offline');
  }
});
}