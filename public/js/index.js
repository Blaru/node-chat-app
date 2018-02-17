var socket = io();

socket.on('connect',function(){
  console.log('Connected to server');
});

socket.on('disconnect',function(){
  console.log('Client disconnected to server');
});

socket.on('newMessage',function(message){
  console.log('new Message');
  console.log(JSON.stringify(message,undefined,2));
});
