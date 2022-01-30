// Get DOM elements in respective Js variables
const form = document.querySelector('.send');
const messageInput = document.getElementById('messageInp');
const container = document.querySelector(".chats");
const usersContainer = document.querySelector('.users');
const sendBtn = document.getElementById('sendBtn');
const moreMenu = document.getElementById('more-menu');
const msgCount = document.querySelector('#msgCount');
let name;
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
    if(position =='left' || position =='center'){
        // audio.play();
        if (scroled_val){
         	container.scrollTop = container.scrollHeight;
        }
        else{
          tempMsg+=1;
          msgCount.innerText = tempMsg;
          goToEnd.style.background = 'var(--theme-color)';
          goToEnd.style.color = 'white';
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
    userElement.id = `user-${data.idKey}`;
    nameElement.classList.add('userName');
    statusElement.classList.add('info');
    statusElement.classList.add(data.info[0]);
    userElement.append(nameElement);
    userElement.append(statusElement);
    nameElement.innerText = data.name;
    statusElement.innerText = (data.info[0] == 'online') ? "online" : data.info[1]
    
    switch (data.info[0]) {
        case 'online':
            statusElement.innerText = "online";
            break;
        case 'offline':
            statusElement.innerText = data.info[1];
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
    document.getElementById(`user-${e}`).remove()
  }
  
  this.typing = (e) => {
     let elem = document.querySelector(`#user-${e} .info`);
     elem.innerText = "typing...";
     console.log(e+' is typing');
     typeTimeout = setTimeout(()=> {
         elem.innerText = "online";
     }, 1000);
  }
  
  this.online = (e) => {
     let elem = document.querySelector(`#user-${e} .info`);
     elem.innerText = "online";
  }
  this.offline = (e) => {
     let elem = document.querySelector(`#user-${e.id} .info`);
     elem.innerText = e.time;
  }
  
  
} // End of Function

appendUser = new AppendUser();

//Setting body height
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', ()=>{
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

//Prevent from Back
window.history.forward();
    function noBack()
    {
        window.history.forward();
    }
document.body.onLoad='noBack();';
document.body.onpageshow='if (event.persisted) noBack();';
document.body.onUnload="";

// const name = "Saikat";


// If the form gets submitted, send server the message

window.oncontextmenu = function(event) {
     event.preventDefault();
     event.stopPropagation();
     return false;
};

goToEndBtn.addEventListener('click', ()=> {
  container.scrollTop = container.scrollHeight;
  console.log(messageInput.activeElement)
  if (messageInput.activeElement){
    messageInput.focus()
  }
})


// Make unread messages read when user went bottom of the container
goToEnd.style.display = 'none'; //Defalt
container.addEventListener('scroll', (e)=>{
  if(scrolled(container)){
    goToEnd.style.display = 'none';
    tempMsg = 0;
    msgCount.innerText = '';
    goToEnd.style.background = 'var(--semi-tp)';
    goToEnd.style.color = 'black'

  }
  else{
    goToEnd.style.display = 'flex';
  }
});
    
// More menu

moreMenu.addEventListener('click', () => {
  // alert("This feature is comming soon");
  document.location.reload(true)
});
  
p = new Promise((resolve, reject) => {
  window.addEventListener('DOMContentLoaded', () => {
    loadingScreen.style.display = 'none';
    nameInp.focus();
  });
  resolve(1);
})

p2 = new Promise((resolve, reject)=>{
  p.then((e)=>{
    nameForm.addEventListener('submit', (e) => {
      e.preventDefault();
      name = nameInp.value;
      myPrompt.style.display = 'none';
      resolve(1);
    });
  });
});
 
p2.then((e)=>{
  connectIO(name);
})