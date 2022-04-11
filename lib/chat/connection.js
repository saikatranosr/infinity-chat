import io from 'socket.io-client'

class Connection {
            constructor({chats, setChats, users, setUsers, setMyId}, userName){
                console.log("***")
                if(!this.socket){
                    this.userName = userName
                    this.setMyId = setMyId
                    this.chats = chats
                    this.setChats = setChats
                    this.users = users
                    this.setUsers = setUsers
                    // setConnecting(true)
                    fetch('/api/socketio')
                    // console.log(this)
                    this.socket = io()
                    // console.log(this.socket)
                    // setConnecting(false)
                }
            }
            
            
            
            connectToIo(){
                // console.log(Connection)
                // Show a Connecting Loader
                console.log("Connecting...")
                //Hide loading, after Connecting
                
                // Sending user's name to the server
                this.socket.emit('new-user-joined', this.userName);
                
                // Getting back all useres details as an object at just join
                this.socket.on('welcome', (userObj) => {
                    // console.log("Connected to connection.js", userName)
                    //   Storing all useres data and useres's socket id
                    console.log(userObj)
                    let _users = userObj;
                    this.setUsers(_users)
                    console.log("MyId", this.setMyId)
                    // this.setMyId(this.socket.id)
                    console.log("Frontend:Welcome ", this.socket.id)
                });
                
                // On New user join
                this.socket.on('user-joined', ({id, name}) => {
                    let _users = this.users
                    _users[id] = {name}
                    this.setUsers(_users)
                    console.log(this.users)
                    // Send notification if user is outside of the App
                    if (document.visibilityState == 'hidden') {
                        //Todo notification("", `${e.userName} joined the chat`)
                    }
                    
                    // Adding the new user to the useres obj
                    //Todo: do this with state
                    // users[e.id] = {}
                    // users[e.id].userName = e.userName;
                    // users[e.id].info = 'online';
                })
                
                // On user leave
                this.socket.on('left', id => {
                    
                    // Send notification if user is outside of the App
                    if (document.visibilityState == 'hidden') {
                        //Todo notification("", `${users[id].userName} left the chat`)
                    }
                    
                    // Remove the user from user obj
                    //Todo
                    // delete users[id];
                });
                
                // If socket gets disconnectd, reconnect when user back to the App
                // this.socket.on('disconnect', () => {
                    
                    // Todo: Add an event listener on document visibity change and if visible...
                    this.socket.emit('new-user-joined', this.userName);
                
                // Feedback from the server when a messgae was succesfully sent to the server
                this.socket.on('sent', msgId => {
                    // Todo: Taking msgId and chnage to message reciept as sent
                });
                
                // On message receive
                
                    // _addmessage(_messageObj)
                    // console.log("Chats: ", this.chats)
                    // console.log(chats)
                    // this.setChats(this.chats.concat(_messageObj))

                    // Send notification if user is outside of the App
                    if (document.visibilityState === 'hidden') {
                        // Todo notification(data.userName, data.message)
                    }

        
                // When a user gets online (opens App from backgrouod)
                this.socket.on('user-online', id => {
                    // Set useres info to online via state
                    //Todo with setUseres: users[id].info = 'online';
                });
        
                this.socket.on('user-offline', data => {
                    // appendUser.offline(data);
                    // Todo
                    // users[data.id].info = data.info;
                });
        
                document.addEventListener("visibilitychange", ()=> {
                    if (document.visibilityState == 'visible') {
                        this.socket.emit('online');
                        // remove all notifications on app open
                        // sw.getNotifications().then(e =>{
                        // for (let i = 0; i < e.length; i++) {
                        //     e[i].close()
                        // }})
                    }
                    else {
                        this.socket.emit('offline');
                    }
                });
        } // connectToIo end
        
        sendMessage({message, msgId}){
            // Send messags to the server
            // console.log("Socket from send: ", socket)
            console.log("Frontend:sendMessage ", this.socket.id)
            this.socket.emit('send', {message, msgId});
        }
    }

export default Connection