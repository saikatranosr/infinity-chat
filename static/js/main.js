appendUser = new AppendUser();

//Setting body height
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', ()=>{
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

// Disable Right Click
container.oncontextmenu = function(event) {
     event.preventDefault();
     event.stopPropagation();
     return false;
};

// If an user clicks on the goToEnd button
goToEndBtn.addEventListener('click', ()=> {
  container.scrollTop = container.scrollHeight;
  console.log(messageInput.activeElement)
  if (messageInput.activeElement){
    messageInput.focus()
  }
})

// Dealing with Textarea Height
  // if (mediaQuery.matches){
  //   mainContainer.style.gridTemplateRows = `40px 50px 1fr ${30 + newHeight}px`;
  // } else {
  //   mainContainer.style.gridTemplateRows = `40px 1fr ${30 + newHeight}px`;
  // }

// Send the message if someone clicks ENTER
messageInput.addEventListener("keypress", ()=>{
    if(event.which === 13 && !event.shiftKey){
        event.target.form.dispatchEvent(new Event("submit", {cancelable: true}));
        event.preventDefault(); // Prevents the addition of a new line in the text field (not needed in a lot of cases)
    }
});

// Make unread messages read when user went bottom of the container
goToEnd.style.display = 'none'; //Defalt
container.addEventListener('scroll', (e)=>{
  if(scrolled(container)){
    goToEnd.style.display = 'none';
    tempMsg = 0;
    msgCount.innerText = '';
    goToEnd.style.background = 'var(--semi-tp)';
    goToEnd.style.color = 'black'
  }  else {
    goToEnd.style.display = 'flex';
  }
});
    
// More menu
moreMenu.addEventListener('click', () => {
  // alert("This feature is comming soon");
  document.location.reload(true)
});

// Enter users name
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
      name = (nameInp.value == '') ? "Kitty" : nameInp.value;
      
      myPrompt.style.display = 'none';
      resolve(1);
    });
  });
});
 
p2.then((e)=>{
  connectIO(name);
})