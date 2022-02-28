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
  theme: 'system',
  color: 'aqua-blue'
}

let colors = {
  'aqua-blue': ["Aqua Blue","#3978c5","linear-gradient(-20deg, rgb(0,92,255) 12%, rgb(31,221,255) 100%)", "hue-rotate(0deg)"],
  'tomato-red': ["Tomato Hotpink", "tomato", "linear-gradient(-20deg, tomato 12%, hotpink 100%)", "hue-rotate(130deg)"],
  'gray': ["Black & White", "gray", "linear-gradient(-20deg, darkgray 12%, lightgray 100%)", "saturation(0)"]
}

// Audio that will play on receiving messages
// var audio = new Audio('/media/ting.mp3');

// Fuction to check scroll
function scrolled(e) {
  if (e.offsetHeight + e.scrollTop >= e.scrollHeight) {
    return true;
  }
}
function scrolled_up(e) {
  if (e.offsetHeight + e.scrollTop >= e.scrollHeight-100) {
    return true;
  }
}
// Function which will append event info to the contaner
function AppendMessage(){
  this.message = (sender, message, position, msgId, senderId)=>{
    let emoji = true;
    let myDate = new Date();
    timeStamp = `${(myDate.getHours()<10?'0':'')+(myDate.getHours())}:${(myDate.getMinutes()<10?'0':'')+(myDate.getMinutes())}`
    const messageFullContainer = document.createElement('div');
    const messageContainer = document.createElement('div');
    const senderElement = document.createElement('div');
    const messageElement = document.createElement('div');
    const infoElement = document.createElement('div');
    const timeElement = document.createElement('span');
    const readElement = document.createElement('span');
    messageFullContainer.classList.add('message-full-container');
    messageContainer.classList.add('message-container');
    messageFullContainer.id = msgId;
    messageFullContainer.classList.add(position);
    senderElement.classList.add('sender-name');
    senderElement.id = `sender-${senderId}`;
    messageElement.classList.add('message');
    infoElement.classList.add('message-info');
    timeElement.classList.add('time-stamp');
    readElement.classList.add('message-read');
    readElement.classList.add('material-icons');
    infoElement.append(timeElement);
    infoElement.append(readElement);
    const nodes = document.querySelectorAll('.sender-name')
    if(document.querySelector('.sender-name') != null){
      // console.log(nodes[nodes.length -1])
      if (nodes[nodes.length -1].id != senderElement.id)
        senderElement.innerText = sender;
      else senderElement.innerText = '';
    }
    else senderElement.innerText = sender;
    
    messageElement.innerText = message;
    let msgArr = Array.from(message);
    
    for (let i=0; i<msgArr.length && emoji; i++){
      emoji = isEmoji(msgArr[i]);
    }
    if(emoji){
      messageElement.style.fontSize = '2rem';
      messageContainer.style.background = 'var(--bg)';
    }
    else if(message == '❤️'){
      messageElement.style.fontSize = '5rem';
      messageContainer.style.background = 'var(--bg)';
      messageElement.style.animation = 'heartbeat 1s alternate infinite'
      // messageElement.style.animation =  
    }
    timeElement.innerText = timeStamp;
    readElement.innerText = 'send'; // done, done_all
    
    // Storing the scroll values before appending
    scroled_val = scrolled(container)
    
    // Append
    messageContainer.append(senderElement);
    messageContainer.append(messageElement);
    messageContainer.append(infoElement);
    messageFullContainer.append(messageContainer);
    container.append(messageFullContainer);
    messageContainer.style.opacity = '1';
    
    messageContainer.addEventListener('mouseup', event => {
    showMsgInfo(messageContainer)
    event.preventDefault()
    event.stopPropagation()
    return false;
    })
    
    messageContainer.addEventListener('contextmenu', (event)=> {
      event.preventDefault()
      event.stopPropagation()
      if (menu.isActive('msg')) menu.hideWithId('msg');
      menu.show(event, 'msg', [{
        icon: 'content_copy',
        text: "Copy",
        doThat: () => navigator.clipboard.writeText(messageElement.innerText)
      },{
        icon: 'delete',
        text: "Delete for me",
        doThat: () => this.deleteForMe(messageFullContainer)
      },{
        icon: 'delete_forever',
        text: "Delete for everyone",
        doThat: () => {
          this.deleteForEveryone(msgId);
          window.dispatchEvent(new CustomEvent('delete-for-everyone',  {detail: msgId}))
        }
      }])
    })
    showMsgInfo(messageContainer);
    // Scrolling properities
    if(position =='left' || position =='center'){
        // audio.play();
        if (scroled_val && document.visibilityState == 'visible'){
         	// container.scrollTop = container.scrollHeight;
         	container.scrollTo({top: container.scrollHeight, behaviour: 'smooth'})
         	// scrollToSmoothly(container, container.scrollHeight, 1000)

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
  // Updating Sent, Delivery and Read receipts
  this.info = (id, info)=>{
    document.querySelector(`#${id} .message-read`).innerText = info
  }
  
  // Delete message
  this.deleteForMe = el => el.remove()
  
  this.deleteForEveryone = id => {
    console.log("ID is "+id)
    const message = document.querySelector(`#${id} .message`);
    const full = document.querySelector(`#${id} .message-container`);
    message.innerHTML = "<i>This message was deleted</i>";
    full.classList.add('deleted')
    full.addEventListener('contextmenu', (event)=> {
      if (menu.isActive('msg')) menu.hideWithId('msg');
      menu.show(event, 'msg', [{
        icon: 'delete',
        text: "Delete for me",
        doThat: () => this.deleteForMe(document.querySelector(`#${id}`))
      }])
    })
  }
  
}

// Append Users names and their status
function AppendUser(){
  let allUser = document.querySelectorAll('.user')
  // To append a single user
  this.appendFoo = (data) =>{
    const localTime = data.info - (new Date().getTimezoneOffset())
    const lastOnline = Math.floor(localTime / 60) + ":" + (((localTime % 60) < 10) ? "0" : "") + (localTime % 60)
    let userElement = document.createElement('div');
    let nameElement = document.createElement('div');
    let statusElement = document.createElement('div');
    userElement.classList.add('user');
    userElement.id = `user-${data.idKey}`;
    nameElement.classList.add('userName');
    statusElement.classList.add('info');
    statusElement.classList.add(data.info);
    userElement.append(nameElement);
    userElement.append(statusElement);
    nameElement.innerText = data.name;
    statusElement.innerText = (data.info == 'online') ? "online" : lastOnline;
    
    switch (data.info) {
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
    document.querySelectorAll('.user').forEach(e=>{
      e.remove()
    })
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
    // console.log(e+' is typing');
     typeTimeout = setTimeout(()=> {
         elem.innerText = "online";
     }, 1000);
  }
  
  this.online = (e) => {
     let elem = document.querySelector(`#user-${e} .info`);
     elem.innerText = "online";
  }
  this.offline = (data) => {
    const localTime = data.info - (new Date().getTimezoneOffset())
    const lastOnline = Math.floor(localTime / 60) + ":" + (((localTime % 60) < 10) ? "0" : "") + (localTime % 60)
     let elem = document.querySelector(`#user-${data.id} .info`);
     elem.innerText = lastOnline;
  }
} // End of Function

function Menu(){
  this.show = (target, id, data)=>{
    const elem = document.createElement('div');
    elem.classList.add('menu');
    elem.classList.add(`menu-${id}`);
    elem.classList.add('noselect');
    let innerElem = [];
    for (let i=0; i<data.length; i++){
      innerElem[i] = document.createElement('div');
      const _tmp_icon = document.createElement('span');
      _tmp_icon.classList.add('material-icons');
      _tmp_icon.innerText = data[i].icon;
      _tmp_text = document.createElement('span');
      _tmp_text.innerText = data[i].text;
      innerElem[i].onclick = (event) =>{ data[i].doThat(event); menu.hide(elem) }
      innerElem[i].append(_tmp_icon);
      innerElem[i].append(_tmp_text);
      elem.append(innerElem[i]);
    }
    document.body.append(elem);
    if(window.innerWidth - target.clientX < elem.clientWidth){
      elem.style.left = (target.clientX - elem.clientWidth) + 'px';
    }
    else {
      elem.style.left = target.clientX + 'px';
    }
    if(window.innerHeight - target.clientY < elem.clientHeight){
      elem.style.top = (target.clientY - elem.clientHeight) + 'px';
    }
    else {
      elem.style.top = target.clientY + 'px';
    }
    
  }
  // Hide all Menues
  this.hideAll = () => {
    document.querySelectorAll('.menu').forEach((e)=>{
      e.remove()
    });
  }
  
  // Hide an particular Menu
  this.hide = (el) => el.remove()
  
  this.hideWithId = (id) => {
    document.querySelectorAll(`.menu-${id}`).forEach(e => e.remove() )
  }
  // Check if an Menu is active
  this.isActive = (id)=>{
    return (document.querySelectorAll(`.menu-${id}`).length != 0)
  }
}

function OptionModal(){
  
}

function InfoModal(){
  
}

function InputModal(){
  
}

function Toast(){
  
}

function Theme(){
  this.theme = (e)=>{
    if (e=='light'){
      settings.theme = 'light';
      root.style.setProperty('--bg', 'white');
      root.style.setProperty('--color', 'black');
      root.style.setProperty('--gray', 'lightgray');
      root.style.setProperty('--light-gray', 'rgb(240,240,240)');
    }
    else if (e=='dark'){
      settings.theme = 'dark';
      root.style.setProperty('--bg', '#15181f');
      root.style.setProperty('--color', 'white');
      root.style.setProperty('--gray', '#4d4d4d');
      root.style.setProperty('--light-gray', 'rgb(60,60,60)');
    }
    else if(e == 'system'){
      //If the browser is in dark mode make it dark
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        theme.theme('dark');
      } else { theme.theme('light') }
    }
    
    else if (e == 'auto'){
      // Dark mode on sunset
      if (new Date().getHours() > 17){
        theme.theme('dark');
      } else { theme.theme('light'); }
    }
  }
  this.color = (e)=>{
    root.style.setProperty('--theme-color', colors[e][1]);
    root.style.setProperty('--theme-gradiant', colors[e][2]);
    root.style.setProperty('--hue', colors[e][3]);
  }
}

function saveSettings(e){
  localStorage.setItem('settings', JSON.stringify(settings))
}

// Click on a messge to show its info and time
function showMsgInfo(e){
  // console.log(e);
  const allMsgs = document.querySelectorAll('.message-container');
  Array.from(allMsgs).forEach(e => {
    e.style.paddingBottom = '10px';
    e.style.minWidth = '0';
    e.querySelector('.message-info').style.bottom = '-20px';
  })
  const elem = e.querySelector('.message-info');
  // console.log(elem);
  e.style.paddingBottom = '20px';
  e.style.minWidth = '50px';
  elem.style.bottom = '0';
}

// Notification stuffs
// function notification(title, body){
//   let tempNoti;
//   let notiSwhown = false;
//   if ('serviceWorker' in navigator) {
//     if (Notification.permission=='default'){
//       Notification.requestPermission(state=>{
//         if (state=='granted'){
//           notiSwhown = true;
//         }
//       });
//     }
//     else if (Notification.permission == 'granted'){
//       notiSwhown = true;
//     }
//   } else {
//     console.warn("serviceWorker is not supported on your browser :)")
//   }
//   if (notiSwhown){
//     sw.getNotifications({tag: 'chatroom'}).then(n =>{
//       if (n.length != 0) tempNoti = n[0].body + '\n';
//     else tempNoti = "";
//     let _c = (title == "") ? "" : ": "
//     let newBody = (tempNoti + toUnicodeVariant(title, 'bold') + toUnicodeVariant(_c, 'bold') + body.replace('\n', " "))
//     sw.showNotification("New Message", {
//       body: newBody,
//       icon: '/media/logo.png',
//       badge: '/media/logo-w.png',
//       renotify: true,
//       tag: 'chatroom',
//       actions: [{
//         action: "mark-as-read",
//         title: "Mark as read"
//       },{
//         action: "close",
//         title: "Close"
//       }]
//     })
//     })
//   }
// }




function isEmoji(str) {
var ranges = [
      '(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32-\ude3a]|[\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])' // U+1F680 to U+1F6FF 
    ];
  return (str.match(ranges.join('|')))
}