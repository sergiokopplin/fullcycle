import * as amqp from "amqplib";

async function consumer() {
  const connection = await amqp.connect("amqp://admin:admin@localhost:5672");
  const channel = await connection.createChannel();

  const queue = "products";

  await channel.assertQueue(queue);
  console.log(`Waiting for messages in ${queue}`);

  channel.consume(
    queue,
    (message) => {
      console.log(
        `Received message: ${JSON.parse(message?.content.toString() || "{}")}`
      );
    },
    {
      noAck: true,
    }
  );
}

consumer().catch(console.error);
