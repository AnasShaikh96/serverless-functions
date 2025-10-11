import axios from "axios";

const BASE_URL = "http://localhost:9001";

async function executeJob(job: any) {
  // Example business logic
  return job;
}

async function poll() {
  try {
    const res = await axios.get(`${BASE_URL}/invocation/next`);
    if (res.status === 204) {
      console.log("polling");
      // No job — wait & poll again
      await new Promise((r) => setTimeout(r, 2000));
      return poll();
    }

    // const job = JSON.parse(res.data);
    const job = res.data;
    const jobId = job.id;

    console.log("job received", job);

    // const jobArr = Object.values(job).flat()

    // console.log("[Poller] Received job:", jobArr);

    try {
      const output = await executeJob(job);

      await axios.post(`${BASE_URL}/invocation/response`, {
        jobId: jobId,
        output,
      });
    } catch (err) {
      await axios.post(`${BASE_URL}/invocation/error`, {
        jobId: jobId,
        error: err,
      });
    }

    poll();
  } catch (err) {
    setTimeout(poll, 3000);
  }
}

poll();
