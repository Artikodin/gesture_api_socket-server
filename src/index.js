// doc: https://github.com/websockets/ws#protocol-support
// doc: https://javascript.info/websocket#chat-example

import WebSocket from "ws";
import https from "https";
import fs from "fs";

const server = https.createServer({
  cert: fs.readFileSync("./certificate2/server.crt"),
  key: fs.readFileSync("./certificate2/server.key")
});

let connections = {};

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on("connection", (ws) => {
  ws.on("message", (message) => {
    let data = JSON.parse(message);
    if (data.guid != null) {
      if (data.guid in connections) {
        connections[data.guid].push(ws);
      } else {
        connections[data.guid] = [ws];
      }
      let connectionData = {
        connections: connections[data.guid].length
      };
      console.log(data);
      ws.send(JSON.stringify(connectionData));
      return;
    }

    let id = Object.keys(connections).find((key) =>
      connections[key].includes(ws)
    );

    if (id != null) {
      connections[id].forEach((client) => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          data.connections = connections[id].length;
          client.send(JSON.stringify(data));
        }
      });
    }
  });
  ws.on("close", () => {
    let id = Object.keys(connections).find((key) =>
      connections[key].includes(ws)
    );
    if (id != null) {
      connections[id] = connections[id].filter((value) => value != ws);
      if (connections[id].length == 0) {
        delete connections[id];
      }
    }
  });
});

server.listen(8081);
