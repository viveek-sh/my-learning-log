import { createClient } from "redis";

const pubClient = createClient();
const subClient = createClient();

await pubClient.connect();
await subClient.connect();

export function pub(channel: string, message: string) {
  pubClient.publish(channel, message);
}

export function sub(channel: string, callback: (message: string) => void) {
  subClient.subscribe(channel, (message) => {
    callback(message);
  });
}

export async function unsub(
  channel: string,
  callback: (message: string) => void,
) {
  await subClient.unsubscribe(channel, (message) => {
    callback(message);
  });
}
