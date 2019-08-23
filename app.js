var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);

function handler (req, res) {
  fs.readFile(__dirname + '/jstemplates/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {
  console.log('Server got connection: ' + socket.id);
  socket.emit('id', socket.id);
  socket.broadcast.emit('client-connected', socket.id);

  socket.on('blob', function (blob) {
    socket.broadcast.emit('blob', blob, socket.id);
  });

  socket.on('im-here', function(id) {
    console.log('Sending im here for id: ' + id);
    socket.broadcast.emit('im-here', id);
  });

  socket.on('disconnect', function() {
    socket.broadcast.emit('client-disconnected', socket.id);
  });

});