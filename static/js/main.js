// Get DOM elements in respective Js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const container = document.querySelector(".container");
const usersContainer = document.getElementById('users');
const sendBtn = document.getElementById('sendBtn');

let users; // All friends in the chatroom
tempMsg = 0 // Unread messages

// Audio that will play on receiving messages
var audio = new Audio('/media/ting.mp3');

// Fuction to check scroll
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
    scroled_val = scrolled(container)
    
    // Append
    messageContainer.append(senderElement)
    messageContainer.append(messageElement)
    container.append(messageContainer);
    
    // Scrolling properities
    if(position =='left'){
        // audio.play();
        if (scroled_val){
    	container.scrollTop = container.scrollHeight
        }
        else{
            //Pending
           // console.log("Unread messages:"+ tempMsg+1);
        }
    }
    if(position =='right'){ 
    	container.scrollTop = container.scrollHeight
    }
}

// Append Users names and their status
function AppendUser(){
  let allUser = document.querySelectorAll('.user')
  // To append a single user
  this.appendFoo = (data) =>{
    let userElement = document.createElement('div');
    let nameElement = document.createElement('div');
    let statusElement = document.createElement('div');
    userElement.classList.add('user');
    userElement.id = data.idKey;
    nameElement.classList.add('userName');
    statusElement.classList.add('info');
    statusElement.classList.add(data.info[0]);
    userElement.append(nameElement);
    userElement.append(statusElement);
    nameElement.innerText = data.name;
    statusElement.innerText = (data.info[0] == 'online') ? "online" : ((data.info[0] == 'typing') ? "typing..." : ``)
    
    switch (data.info[0]) {
        case 'online':
            statusElement.innerText = "online";
            break;
        case 'typing':
            statusElement.innerText = "typing...";
            break;
        case 'offline':
            lastOnline = `${data.info[1].getHours()}:${data.info[1].getMinutes()}`
            statusElement.innerText = lastOnline;
            break;
    }
    usersContainer.append(userElement);
  }
  
  // To append all the useres one time
  this.renderAll = ()=>{
    Object.keys(users).forEach(e =>{
        this.appendFoo({idKey: e, name: users[e].name, info: users[e].info})
    })
  }
  
  // To remove a user, Tekes id
  this.removeUser = (e) => {
    document.getElementById(e).remove()
  }
  
}
appendUser = new AppendUser();

// Prevent from Back
window.history.forward();
    function noBack()
    {
        window.history.forward();
    }
document.body.onLoad='noBack();';
document.body.onpageshow='if (event.persisted) noBack();';
document.body.onUnload="";

// Ask new user for his/her name and let the server know
let name = prompt("Enter your name to join");
if(name == '' || name == null || name == undefined){
    name = "Kitty"
}
// const name = "Saikat";


// If the form gets submitted, send server the message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    if (message !== ""){
	    appendMessage('', message, 'right');
	    socket.emit('send', message);
	    messageInput.value = '';
	    messageInput.focus();
    }
});

// Make unread messages read when user went bottom of the container
//Listen scroll event
    // if(scrolled(container)){
    //     tempMsg = 0
    // }