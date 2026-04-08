import { processQueue } from "../src/compiler/queue.js";

async function main() {
  console.log("Compiling pending raw articles...");
  const result = await processQueue("/Users/rahilsinghi/Desktop/brain", { maxRetries: 3 });
  console.log("Queue result:", JSON.stringify(result, null, 2));
}

main();
