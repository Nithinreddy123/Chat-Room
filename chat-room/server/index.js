const http = require("http");
const express = require("express");
const WebSocket = require("ws");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const { connect } = require("http2");
const Room = require("./Room");

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server, clientTracking: true });

const activesockets = {};

const rooms = {};
const room_map = {};
const room_list = [];
wss.on("connection", (ws, req) => {
  console.log(`Accepted connection`);
  const room_name = req.url.substr(1);
  const uuid = uuidv4();
  activesockets[uuid] = ws;
  ws.id = uuid;

  // pool.push(ws);

  room_map[uuid] = room_name;
  //console.log(room_name)
  if (room_list.includes(room_name)) {
    let curr_room = rooms[room_name];
    curr_room.addUser(ws);
  } else {
    rooms[room_name] = new Room();
    rooms[room_name].addUser(ws);
    room_list.push(room_name);
  }

  ws.on("message", (data) => {
    const local_client = rooms[room_map[ws.id]];
    //console.log(room_map[ws.id]);
    local_client.broadCastMessage(data, ws.id);
  });

  ws.on("close", function () {
    rooms[room_map[ws.id]].removeUser(ws.id);
    console.log("closed connect");
    delete activesockets[ws.id];
    delete room_map[ws.id];

    //
  });
});

server.listen(process.env.PORT || 3033, () => {
  console.log("listening on port " + (process.env.PORT || 3033));
});

setInterval(function () {
  activesockets = {};

  rooms = {};
  room_map = {};
  room_list = [];
}, 3600000);
