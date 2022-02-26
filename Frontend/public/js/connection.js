function connectIO(name){
const socket = io("ws://localhost:8000");
socket.emit('new-user-joined', name);
loadingScreen.style.display = 'flex';
// Welcome a user when welcome him/her and takes the users object and shand
socket.on('welcome', e => {
  loadingScreen.style.display = 'none';
    messageInput.focus();
    users = e.obj;
    delete users[e.myId]
    myId = e.myId;
    console.log(users)
    appendMessage.message('', `${name}, Welcome to Infinity Chat.`, 'center')
    appendUser.renderAll()
});

form.addEventListener('submit', event => {
    const message = messageInput.value.trim();
    if (message.length !== 0){
      let msgId = `msg-${myId}-${Date.now()}`;
  	  appendMessage.message('', message, 'right', msgId, myId);
  	  socket.emit('send', message, msgId);
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
    event.preventDefault()
    event.stopPropagation()
});
socket.on('sent', (msgId)=>{
  appendMessage.info(msgId, 'done'); //done == tick_mark
})

// If a new user joins, receive his/her name from the server
socket.on('user-joined', e =>{
    appendMessage.message('', `${e.name} joined the chat`, 'center', '');
    if(document.visibilityState == 'hidden'){
    // notification("", `${e.name} joined the chat`)
  }
    users[e.id] = {}
    users[e.id].name = e.name;
    users[e.id].info = 'online';
    console.log(users);
    appendUser.appendFoo({idKey: e.id, name: e.name, info: 'online'})
})

// If server sends a message, receive it
socket.on('receive', data =>{
  appendMessage.message(data.name, data.message, 'left', data.id, data.sender)
  if(document.visibilityState == 'hidden'){
    // notification(data.name, data.message)
  }
})

// If a user leaves the chat, append the info to the container
socket.on('left', id =>{
    appendMessage.message('', `${users[id].name} left the chat`, 'center', '');
    if(document.visibilityState == 'hidden'){
    // notification("", `${users[id].name} left the chat`)
  }
    delete users[id];
    appendUser.removeUser(id)
});

// If someone disconnected from server let him know
socket.on('disconnect', function(){
    socket.emit('new-user-joined', name);
    appendUser.renderAll()
});

messageInput.addEventListener('input', ()=> {
    socket.emit('typing');
});

socket.on('user-typing', e => {
    appendUser.typing(e);
});

socket.on('user-online', e =>{
  appendUser.online(e);
  users[e].info = 'online';
});

socket.on('user-offline', data =>{
  appendUser.offline(data);
  users[data.id].info = data.info;
});

document.addEventListener("visibilitychange", function() {
  if (document.visibilityState == 'visible') {
    socket.emit('online');
    // remove all notifications on app open
    // sw.getNotifications().then(e =>{
    // for (let i = 0; i < e.length; i++) {
    //     e[i].close()
    // }})
  }
  else {
    socket.emit('offline');
  }
});

socket.on('user-delete', id => {
  console.log("ID from connection: "+id)
  appendMessage.deleteForEveryone(id);
})

window.addEventListener('delete-for-everyone', event => {
  console.log("Event: "+event.detail)
  socket.emit('delete', event.detail)
})
}