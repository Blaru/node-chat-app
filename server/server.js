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
class message {
  constructor(from, text){
  this.from = from;
  this.text = text;
  this.createdAt= new Date().getTime();
}};
io.on('connection',(socket)=>{
  var id = client_n++;
  socket.emit('newMessage',new message('Admin','Welcome to chat app'));
  socket.broadcast.emit('newMessage',new message('Admin',`Client:${id} has joined the chat}`));
  console.log('New user connected');
  socket.on('createMessage',(message)=>{
    message.createdAt = new Date().getTime();
    console.log(JSON.stringify(message,undefined,2));
    //io.emit('newMessage',message);
    socket.broadcast.emit('newMessage',message);
  });
  socket.on('disconnect',()=>{
    client_n--;
    console.log('Client disconnected to server');
  });
});

server.listen(port,()=>{
  console.log(`app listening on port ${port}!`);
});
