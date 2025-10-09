// index.js
const axios = require("axios");

const BASE_URL = "http://localhost:9001";

async function executeJob(job) {
  // Example business logic
  if (job.payload.number % 2 === 0) {
    return { result: job.payload.number * 2 };
  } else {
    throw new Error("Odd number, failed processing.");
  }
}

async function poll() {
  try {
    const res = await axios.get(`${BASE_URL}/invocation/next`);
    if (res.status === 204) {
      // No job — wait & poll again
      await new Promise((r) => setTimeout(r, 2000));
      return poll();
    }

    const job = res.data;
    console.log("[Poller] Received job:", job);

    try {
      const output = await executeJob(job);
      await axios.post(`${BASE_URL}/invocation/response`, {
        jobId: job.id,
        output,
      });
      console.log("[Poller] ✅ Sent success response");
    } catch (err) {
      await axios.post(`${BASE_URL}/invocation/error`, {
        jobId: job.id,
        error: err.message,
      });
      console.log("[Poller] ❌ Sent error response");
    }

    // Immediately continue polling
    poll();
  } catch (err) {
    console.error("[Poller] Poll error:", err.message);
    // retry after delay
    setTimeout(poll, 3000);
  }
}

poll();
