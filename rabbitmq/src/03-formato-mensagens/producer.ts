import * as amqp from "amqplib";

async function producer() {
  const connection = await amqp.connect("amqp://admin:admin@localhost:5672");
  const channel = await connection.createChannel();

  const queue = "products";
  const message = JSON.stringify({ id: 1, name: "Product 1", price: 100 });

  await channel.assertQueue(queue); // create queue if it doesn't exist
  channel.sendToQueue(queue, Buffer.from(message), {
    contentType: "application/json",
  });

  console.log(`Message sent: ${message}`);

  setTimeout(() => {
    connection.close();
    process.exit(0);
  }, 500);
}

producer().catch(console.error);
