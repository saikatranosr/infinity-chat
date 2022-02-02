// Get DOM elements in respective Js variables
const form = document.querySelector('.send');
const messageInput = document.getElementById('messageInp');
const container = document.querySelector(".chats");
const usersContainer = document.querySelector('.users');
const sendBtn = document.getElementById('sendBtn');
const moreMenu = document.getElementById('more-menu');
const msgCount = document.querySelector('#msgCount');
const sendContainer = document.querySelector('.send')
const mainContainer = document.querySelector('.main');
const mediaQuery = window.matchMedia('(max-width: 500px)')
let root = document.querySelector(':root');
let name;
let users; // All friends in the chatroom
tempMsg = 0 // Unread messages
let settings = {
  theme: 'light',
  color: 'aqua-blue'
}

// Audio that will play on receiving messages
var audio = new Audio('/media/ting.mp3');

// Fuction to check scroll
function scrolled(e) {
  if (e.offsetHeight + e.scrollTop >= e.scrollHeight) {
    return true;
  }
}
function scrolled_up(e) {
  if (e.offsetHeight + e.scrollTop >= e.scrollHeight-500) {
    return true;
  }
}
// Function which will append event info to the contaner
function appendMessage(sender, message, position){
    let myDate = new Date();
    timeStamp = `${(myDate.getHours()<10?'0':'')+(myDate.getHours())}:${(myDate.getMinutes()<10?'0':'')+(myDate.getMinutes())}`
    const messageContainer = document.createElement('div');
    const senderElement = document.createElement('div');
    const messageElement = document.createElement('div');
    const timeElement = document.createElement('div');
    messageContainer.classList.add('message-container');
    messageContainer.classList.add(position);
    senderElement.classList.add('sender-name');
    messageElement.classList.add('message');
    timeElement.classList.add('time-stamp');
    senderElement.innerText = sender;
    messageElement.innerText = message;
    timeElement.innerText = timeStamp;
    
    // Storing the scroll values before appending
    scroled_val = scrolled(container)
    
    // Append
    messageContainer.append(senderElement)
    messageContainer.append(messageElement)
    messageContainer.append(timeElement);
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

function Menu(){
  this.show = (target, data)=>{
    this.hideAll()
    elem = document.createElement('div');
    elem.classList.add('menu');
    elem.classList.add('noselect');
    let innerElem = [];
    for (let i=0; i<data.length; i++){
      innerElem[i] = document.createElement('div');
      _tmp_icon = document.createElement('span');
      _tmp_icon.classList.add('material-icons');
      _tmp_icon.innerText = data[i].icon;
      _tmp_text = document.createElement('span');
      _tmp_text.innerText = data[i].text;
      innerElem[i].onclick = data[i].doThat;
      innerElem[i].append(_tmp_icon);
      innerElem[i].append(_tmp_text);
      elem.append(innerElem[i]);
    }
    document.body.append(elem);
    if(window.innerWidth - target.offsetLeft < elem.clientWidth - 10){
      elem.style.left = (target.offsetLeft - elem.clientWidth) + 'px';
    }
    else {
      elem.style.left = target.offsetLeft + 'px';
    }
    if(window.innerHeight - target.offsetTop < elem.clientHeight - 10){
      elem.style.top = (target.offsetTop - elem.clientWidth) + 'px';
    }
    else {
      elem.style.top = target.offsetTop + 'px';
    }
  }
  this.hideAll = ()=>{
    document.querySelectorAll('.menu').forEach((e)=>{
      e.remove()
    });
  }
  
  this.isActive = ()=>{
    return (document.querySelectorAll('.menu').length != 0)
  }
}

function Theme(){
  this.theme = (e)=>{
    if (e=='light'){
      settings.theme = 'light';
      root.style.setProperty('--bg', 'white');
      root.style.setProperty('--color', 'black');
      root.style.setProperty('--gray', 'lightgray');
      root.style.setProperty('--light-gray', 'rgb(240,240,240)');
      root.style.setProperty('--theme-color', '#3978c5');
    } else if (e=='dark'){
      settings.theme = 'dark';
      root.style.setProperty('--bg', '#15181f');
      root.style.setProperty('--color', 'white');
      root.style.setProperty('--gray', '#4d4d4d');
      root.style.setProperty('--light-gray', 'rgb(60,60,60)');
      root.style.setProperty('--theme-color', '#5aa5ff');
    }
  }
  this.color = (e)=>{
    alert('theme changed');
  }
}