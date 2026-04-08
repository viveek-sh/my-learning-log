import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "test-app",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const main = async () => {
  //Produce some event
  await producer.connect();
  await producer.send({
    topic: "testEvent",
    messages: [
      { key: "user-1", value: "User 1 event" },
      { key: "user-2", value: "User 2 event" },
    ],
  });
};

main().catch(console.error);
