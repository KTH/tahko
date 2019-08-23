var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(3000);

function handler (req, res) {
  fs.readFile(__dirname + '/jstemplates/video.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading video.html');
    }
    res.writeHead(200);
    res.end(data);
  });
}

io.on('connection', function (socket) {

  socket.on('message', function (data) {
    console.log('Server got message: ' + JSON.stringify(data));
    socket.broadcast.emit('message', data, socket.id);
  });

});