// doc: https://github.com/websockets/ws#protocol-support
// doc: https://javascript.info/websocket#chat-example
import WebSocket from "ws";

const webSocketServer = new WebSocket.Server({ port: 8080 });

webSocketServer.on("connection", (ws) => {
  console.log("someone connected");
  ws.on("message", (message) => {
    webSocketServer.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
