var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var PORT = 3000;
var users = 0;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	//Socket Functions Go Here
	users += 1;
	io.sockets.emit('connected', {description: users});
	console.log(users + ' ' + 'users connected.');
	socket.on('disconnect', function() {
		users -= 1;
		console.log(users + ' ' + 'users connected.');
		io.sockets.emit('disconnected', {description: users});
	});

	//Normal Functions
	socket.on('keypress', function(text) {
		console.log('user submitted:', text);
		io.sockets.emit('broadcast', {string: text} );
	});
});

http.listen(process.env.PORT || 3000);
console.log('connected to localhost:' + PORT);
