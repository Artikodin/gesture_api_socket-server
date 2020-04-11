// doc: https://github.com/websockets/ws#protocol-support
// doc: https://javascript.info/websocket#chat-example
import WebSocket from "ws";
import https from "https";
import fs from "fs";

const server = https.createServer({
  cert: fs.readFileSync("./certificate2/server.crt"),
  key: fs.readFileSync("./certificate2/server.key")
});

const webSocketServer = new WebSocket.Server({ server });

webSocketServer.on("connection", (ws) => {
  console.log("someone connected");
  ws.on("message", (message) => {
    console.log(message);
    webSocketServer.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

server.listen(8081);
