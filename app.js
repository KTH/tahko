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
  socket.on('blob', function (blob, myId) {
    socket.broadcast.emit('blob', blob, myId);
  });

  socket.on('stream', function(blob, myId) {
    socket.broadcast.emit('stream', blob, myId);
  });
});