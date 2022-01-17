const socket = io();
// Get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const container = document.querySelector(".container")

// All friends in the chatroom
let users = {};

// Audio that will play on receiving messages
var audio = new Audio('/media/ting.mp3');

function scrolled(e) {
  if (e.offsetHeight + e.scrollTop >= e.scrollHeight) {
    return true;
  }
}

// Function which will append event info to the contaner
function appendMessage(sender, message, position){
    const messageContainer = document.createElement('div');
    const senderElement = document.createElement('div');
    const messageElement = document.createElement('div');
    messageContainer.classList.add('message-container');
    messageContainer.classList.add(position);
    senderElement.classList.add('sender-name');
    messageElement.classList.add('message');
    senderElement.innerText = sender;
    messageElement.innerText = message;
    
    // Storing the scroll values before appending
    scroled = scrolled(container)
    
    // Append
    messageContainer.append(senderElement)
    messageContainer.append(messageElement)
    container.append(messageContainer);
    
    // Scrolling properities
    if(position =='left'){
        audio.play();
        if (scroled){
    	container.scrollTop = container.scrollHeight
        }
    }
    if(position =='right'){ 
    	container.scrollTop = container.scrollHeight
    }
}


// Ask new user for his/her name and let the server know
const name = prompt("Enter your name to join");
// const name = "Saikat";

socket.emit('new-user-joined', name);

socket.on('receive-names', data => {
    users = data;
    console.log(users)
});

// If a new user joins, receive his/her name from the server
socket.on('user-joined', name =>{
    appendMessage('', `${name} joined the chat`, 'center')
    users[socket.id] = name;
    console.log(users)
})


// If server sends a message, receive it
socket.on('receive', data =>{
    appendMessage(data.name, data.message, 'left')
})

// If a user leaves the chat, append the info to the container
socket.on('left', name =>{
    appendMessage('', `${name} left the chat`, 'center')
    delete users[socket.id];

})

// If the form gets submitted, send server the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if (message !== ""){
	    appendMessage('', message, 'right');
	    socket.emit('send', message);
	    messageInput.value = ''
    }
})