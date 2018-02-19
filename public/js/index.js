var socket = io();

socket.on('connect',function(){
  console.log('Connected to server');
});

socket.on('disconnect',function(){
  console.log('Client disconnected to server');
});

socket.on('newMessage',function(message){
  console.log('new Message' + JSON.stringify(message,undefined,2));
  var li = $('<li>');
  li.text(`${message.from}:${message.text}`);
  $('#messages').append(li);
});

$('#message-form').submit(function(e){
  e.preventDefault();
  socket.emit('createMessage',{
      from:'User',
      text:$('[name=message]').val()
    },function(AckSRC){
      console.log('Ack from:'+AckSRC);
  });
});
