import * as amqp from "amqplib";

async function producer() {
  const connection = await amqp.connect("amqp://admin:admin@localhost:5672");
  const channel = await connection.createChannel();

  const queue = "products";

  const message = new Array(100000).fill(0).map((_, index) => ({
    id: index,
    name: `Product ${index}`,
    price: Math.floor(Math.random() * 1000),
  }));

  await Promise.all(
    message.map((msg) =>
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)), {
        contentType: "application/json",
      })
    )
  );

  console.log(`Sent messages in ${queue}`);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

producer().catch(console.error);
