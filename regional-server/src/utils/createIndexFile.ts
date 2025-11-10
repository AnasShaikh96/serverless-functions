const axios = require("axios");
const dotenv = require('dotenv')

dotenv.config()

const BASE_URL = process.env.BASE_URL;
const owner = process.env.OWNER_ID;
const functionName = process.env.FUNCTION_NAME;


async function executeJob(job) {
    return job

}


async function poll() {
    try {
        const res = await axios.get(`${BASE_URL}/invocation/next`);
        if (res.status === 204) {
            // No job, wait & poll again
            await new Promise((r) => setTimeout(r, 2000));
            return poll();
        }

        const job = res.data;
        const jobId = job.id
        const jobPayload = job.payload


        if (jobPayload.fnId !== owner || jobPayload.fnName !== functionName) {
            // No job, wait & poll again
            await new Promise((r) => setTimeout(r, 2000));
            return poll();
        }

        try {
            const output = await executeJob(job);

            await axios.post(`${BASE_URL}/invocation/response`, {
                jobId: jobId, output
            });
            console.log("Sent success response");
        } catch (err) {
            await axios.post(`${BASE_URL}/invocation/error`, {
                jobId: jobId, error: err
            });
            console.log("Sent error response");
        }

        // Immediately continue polling
        poll();
    } catch (err) {
        console.error("[Poller] Poll error:", err);
        // retry after delay
        setTimeout(poll, 3000);
    }
}

poll();
