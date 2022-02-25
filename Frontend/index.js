// Node server which will handle socket io connections
const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const port = process.env.PORT || 3000

app.use(express.static(__dirname +'/static'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// CREATING SERVER
app.get('/', (req, res)=>{
	res.render('index');
});

// Starting server
app.listen(port, () => {
  console.log('listening on *: '+port);
});