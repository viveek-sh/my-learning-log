import { WebSocketServer, WebSocket } from "ws";
import crypto from "crypto";
import { pub, sub, unsub } from "./redisClient.js";

const wss = new WebSocketServer({ port: 8080 });

const users: {
  [key: string]: {
    ws: WebSocket;
    rooms: string[];
  };
} = {};

wss.on("connection", (ws) => {
  ws.send("Connected to the WebSocket");

  const id = crypto.randomUUID();
  users[id] = {
    ws: ws,
    rooms: [],
  };

  ws.on("message", (data) => {
    try {
      const userMessage = JSON.parse(data.toString());

      if (userMessage.type === "SUBSCRIBE") {
        const user = users[id];
        if (!user) return;
        sub(userMessage.room, (message) => {
          ws.send(message);
        });
        user.rooms.push(userMessage.room);
        console.log("New subscription:", { userId: id, rooms: user.rooms });
      }

      if (userMessage.type === "UNSUBSCRIBE") {
        const user = users[id];
        if (!user) return;
        unsub(userMessage.room, (message) => {
          ws.send(message);
        });
        user.rooms = user.rooms.filter((room) => room !== userMessage.room);
        console.log("Subscriptions:", { userId: id, rooms: user.rooms });
      }

      if (userMessage.type === "sendMessage") {
        pub(userMessage.room, userMessage.message);

        // Use this block when not using PUB SUB
        // Object.keys(users).forEach((key) => {
        //   const user = users[key];
        //   if (!user) return;

        //   if (user.rooms.includes(userMessage.room)) {
        //     user.ws.send(userMessage.message);
        //   }
        // });
      }
    } catch (err) {
      console.error("Invalid JSON:", err);
    }
  });

  ws.on("close", () => {
    delete users[id];
  });
});
