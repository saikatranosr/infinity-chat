appendUser = new AppendUser();
appendMessage = new AppendMessage()
menu = new Menu()
theme = new Theme()

// Getting settings
_settings = JSON.parse(localStorage.getItem('settings'));
if (_settings != null){
  settings = _settings;
}
theme.theme(settings.theme);
theme.color(settings.color);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
    let newColorScheme = e.matches ? "dark" : "light";
    theme.theme(newColorScheme);
});
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
  if (document.activeElement == messageInput){
    messageInput.focus()
  }
})

// Dealing with Textarea Height
messageInput.addEventListener('input', ()=>{
  if(messageInput.scrollHeight < 100){
    let newHeight = messageInput.scrollHeight;
    messageInput.style.height = (newHeight - 12) + 'px';
    if (mediaQuery.matches){
      mainContainer.style.gridTemplateRows = `40px 50px 1fr ${11 + newHeight}px`;
    } else {
      mainContainer.style.gridTemplateRows = `40px 1fr ${11 + newHeight}px`;
    }
    if(scrolled(container)){
      container.scrollTop = container.scrollHeight;
    }
  }
});

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
  if(scrolled_up(container)){
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
  if (menu.isActive()){
    menu.hideAll()
  }
  else {
    menu.show(moreMenu, [{
      icon: 'refresh',
      id: 'reload_page',
      text: "Reload",
      doThat: ()=>{
        document.location.reload(true)
      }
    },{
      icon: 'brightness_4',
      text: 'Theme',
      doThat: ()=>{
        menu.hideAll()
        menu.show(moreMenu, [{
          icon: (settings.theme == 'light') ? "done" : 'check_box_outline_blank',
          text: "Light",
          doThat: ()=>{
            theme.theme('light');
            settings.theme = 'light';
            menu.hideAll();
          }
        },
        {
          icon: (settings.theme == 'dark') ? "done" : 'check_box_outline_blank',
          text: "Dark",
          doThat: ()=>{
            theme.theme('dark');
            settings.theme = 'dark';
            saveSettings()
            menu.hideAll();
          }},
        {
          icon: (settings.theme == 'system') ? "done" : 'check_box_outline_blank',
          text: "System",
          doThat: ()=>{
            theme.theme('system');
            settings.theme = 'system';
            saveSettings();
            menu.hideAll();
          }},
        {
          icon: (settings.theme == 'auto') ? "done" : 'check_box_outline_blank',
          text: "Auto",
          doThat: ()=>{
            theme.theme('auto');
            saveSettings()
            settings.theme = 'auto';
            menu.hideAll();
          }
        }])
      }
    },
    {
      icon: 'palette',
      text: 'Color',
      doThat: ()=>{
        menu.show(moreMenu, [{
          icon: (settings.color == 'aqua-blue') ? "done" : 'check_box_outline_blank',
          text: "Aqua Blue",
          doThat: ()=>{
            theme.color('aqua-blue');
            settings.color = 'aqua-blue';
            menu.hideAll()
            saveSettings()
          }
        },
        {
          icon: (settings.color == 'tomato-red') ? "done" : 'check_box_outline_blank',
          text: "Tomato Hotpink",
          id: "tomato-hotpink",
          doThat: ()=>{
            theme.color('tomato-red');
            settings.color = 'tomato-red';
            saveSettings()
            menu.hideAll();
          }
        }])
      }
    }] )
  }
}); // End of Event listener

// Enter users name
p = new Promise((resolve, reject) => {
  window.addEventListener('DOMContentLoaded', () => {
    loadingScreen.style.display = 'none';
    nameInp.focus();
  });
  resolve(1);
})

// Get name from the user
p2 = new Promise((resolve, reject)=>{
  p.then((e)=>{
    nameForm.addEventListener('submit', (e) => {
      e.preventDefault();
      name = nameInp.value.trim();
      if (name.length == 0){
        name = "Kitty";
        } else if (name.length > 10){
        name = name.substr(0, 9).trim();
      }
      myPrompt.style.display = 'none';
      messageInput.focus();
      resolve(1);
    });
  });
});
 
p2.then((e)=>{
  connectIO(name);
})

// Service Workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('/sw.js').then((e)=>{
      console.log("serviceWorker registration successful", e)
    })
    .catch(e=>{
      console.warn("Service worker registration failed", e)
    })
  })
}
else{
  console.warn("serviceWorker is not supported on your browser :)")
}

Push.create("Hello World");