appendUser = new AppendUser();
appendMessage = new AppendMessage()
menu = new Menu()
theme = new Theme()

// Hiding Menu on click on anywhere
container.addEventListener('click', ()=> {
  menu.hideWithId('msg')
  menu.hideWithId('more-menu')
})
appendMessage.message("", "❤️", 'left', 'none', 'none');
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

// If an user clicks on the goToEnd button
goToEndBtn.addEventListener('click', ()=> {
  // container.scrollTop = container.scrollHeight;
  container.scrollTo({top: container.scrollHeight, behaviour: 'smooth'})
  // scrollToSmoothly(container, container.scrollHeight, 1000, container.scrollTop / (container.scrollHeight - container.clientHeight))
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
    if (mediaQuery.matches) mainContainer.style.gridTemplateRows = `40px 50px 1fr ${13 + newHeight}px`;
    else mainContainer.style.gridTemplateRows = `40px 1fr ${13 + newHeight}px`;
    
    if(scrolled(container)) container.scrollTop = container.scrollHeight;
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
//Adding array of objects of colors in the settings
let color_arr = [];
for(let i=0; i < Object.keys(colors).length; i++){
color_arr.push(
  {
    icon: "done",
    text: colors[Object.keys(colors)[i]][0],
    doThat: ()=>{
      theme.color(Object.keys(colors)[i]);
      settings.color = Object.keys(colors)[i];
      menu.hideAll()
      saveSettings()
  }
}
)
}
//Listening click event on more menunand showing the menu
moreMenu.addEventListener('click', (event) => {
  if (menu.isActive('more-menu')) menu.hideWithId('more-menu');
  else {
    menu.show(event, 'more-menu', [{
      icon: 'refresh',
      text: "Reload",
      doThat: () => document.location.reload(true)
    },{
      icon: 'brightness_4',
      text: 'Theme',
      doThat: (event)=>{
        menu.show(event,'more-menu' , [{
          icon: (settings.theme == 'light') ? "done" : 'check_box_outline_blank',
          text: "Light",
          doThat: ()=>{
            theme.theme('light');
            settings.theme = 'light';
            saveSettings()
          }
        },
        {
          icon: (settings.theme == 'dark') ? "done" : 'check_box_outline_blank',
          text: "Dark",
          doThat: ()=>{
            theme.theme('dark');
            settings.theme = 'dark';
            saveSettings()
          }},
        {
          icon: (settings.theme == 'system') ? "done" : 'check_box_outline_blank',
          text: "System",
          doThat: ()=>{
            theme.theme('system');
            settings.theme = 'system';
            saveSettings();
          }},
        {
          icon: (settings.theme == 'auto') ? "done" : 'check_box_outline_blank',
          text: "Auto",
          doThat: ()=>{
            theme.theme('auto');
            saveSettings()
            settings.theme = 'auto';
          }
        }])
      }
    },
    {
      icon: 'palette',
      text: 'Color',
      doThat: (event)=>{
        menu.show(event, 'more-menu', color_arr)
      }
  }])
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
p2 = new Promise((resolve, reject) => {
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
      resolve(1);
    });
  });
});
 
p2.then((e) => connectIO(name))

// Service Workers
if ('serviceWorker' in navigator) {
  window.addEventListener('load', ()=>{
    navigator.serviceWorker.register('/sw.js').then((e)=>{
      console.log("serviceWorker registration successful", e)
      sw = e;
    })
    .catch(e=>{
      console.warn("Service worker registration failed", e)
    })
  })
  navigator.serviceWorker.addEventListener('message', function(event) {
    console.log("Got reply from service worker: " + event.data);
    window.focus()
  });
}
else{
  console.warn("serviceWorker is not supported on your browser :)")
}
