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

        const room = userMessage.room;

        // check BEFORE adding user
        const alreadySubscribed = Object.values(users).some((u) =>
          u.rooms.includes(room),
        );

        if (!alreadySubscribed) {
          sub(room, (message) => {
            const parsedMessage = JSON.parse(message);

            Object.values(users).forEach((user) => {
              if (user.rooms.includes(parsedMessage.room)) {
                user.ws.send(parsedMessage.message);
              }
            });
          });

          console.log("Subscribed to:", room, " channel on Redis.");
        }
        user.rooms.push(room);

        console.log("New subscription:", { userId: id, rooms: user.rooms });
      }

      if (userMessage.type === "UNSUBSCRIBE") {
        const user = users[id];
        if (!user) return;

        const room = userMessage.room;

        // remove from the Users obj
        user.rooms = user.rooms.filter((r) => r !== room);

        // check if anyone still subscribed
        const stillHasUsers = Object.values(users).some((u) =>
          u.rooms.includes(room),
        );

        if (!stillHasUsers) {
          unsub(room);
          console.log("Unsubscribed from:", room);
        }
      }

      if (userMessage.type === "sendMessage") {
        pub(
          userMessage.room,
          JSON.stringify({
            room: userMessage.room,
            message: userMessage.message,
          }),
        );

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
    const user = users[id];
    if (!user) return;

    user.rooms.forEach((room) => {
      const stillHasUsers = Object.values(users)
        .filter((u) => u !== user)
        .some((u) => u.rooms.includes(room));

      if (!stillHasUsers) {
        unsub(room);
        console.log("Unsubscribed from:", room);
      }
    });

    delete users[id];
  });
});

function userExsistOn() {}
