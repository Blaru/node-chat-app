const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname,'../public/');
const port = process.env.PORT || 3000;
const app = express();
var server = http.createServer(app);
var io = socketIO(server);
var client_n =0;

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  var id = client_n++;
  console.log('New user connected');
  socket.on('createMessage',(message)=>{
    message.createdAt = new Date();
    console.log(JSON.stringify(message,undefined,2));
    io.emit('newMessage',message);
  });
  socket.on('disconnect',()=>{
    client_n--;
    console.log('Client disconnected to server');
  });
});

server.listen(port,()=>{
  console.log(`app listening on port ${port}!`);
});
