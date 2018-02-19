
const {generateMessage} = require('./utils/message');

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
  socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
  socket.broadcast.emit('newMessage',generateMessage('Admin',`Client:${id} has joined the chat`));
  console.log(`User: ${id} connected`);
  socket.on('createMessage',(message,callback)=>{
    message.createdAt = new Date().getTime();
    console.log(JSON.stringify(message,undefined,2));
    io.emit('newMessage',message);
    //socket.broadcast.emit('newMessage',message);
    callback('Server');
  });
  socket.on('disconnect',()=>{
    client_n--;
    console.log(`User: ${id} disconnected`);
  });
});

server.listen(port,()=>{
  console.log(`app listening on port ${port}!`);
});
