require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const scanRoute = require('./routes/scan');
const dumpRoute = require('./routes/dump');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {cors:{origin:'*'}});

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.use('/api/scan', scanRoute);
app.use('/api/dump', dumpRoute);

io.on('connection', (socket) => {
  console.log('Terminal conectado:', socket.id);
  global.socket = socket;
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Servidor on ${PORT}`));
