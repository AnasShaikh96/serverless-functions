const axios = require("axios");
const BASE_URL = "http://localhost:4342/api/v1";

 

async function executeJob(job) {
    return job
}

async function poll() {
    try {
        const res = await axios.get(`${BASE_URL}/invocation/next`);
        if (res.status === 204) {
            console.log("polling")
            await new Promise((r) => setTimeout(r, 2000));
            return poll();
        }

        const job = res.data;
        const jobId = job.id

        try {
            const output = await executeJob(job);

            await axios.post(`${BASE_URL}/invocation/response`, {
                jobId: jobId, output
            });
            console.log("[Poller] ✅ Sent success response");
        } catch (err) {
            await axios.post(`${BASE_URL}/invocation/error`, {
                jobId: jobId, error: err
            });
            console.log("[Poller] ❌ Sent error response");
        }

        // Immediately continue polling
        poll();
    } catch (err) {
        console.error("[Poller] Poll error:", err);
        setTimeout(poll, 3000);
    }
}

poll();
