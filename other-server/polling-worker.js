// index.js
const axios = require("axios");

const BASE_URL = "http://localhost:9001";

async function executeJob(job) {
	// Example business logic
	//   if (job.payload.number % 2 === 0) {
	//     return { result: job.payload.number * 2 };
	//   } else {
	//     throw new Error("Odd number, failed processing.");
	//   }

	return job

}

async function poll() {
	try {
		const res = await axios.get(`${BASE_URL}/invocation/next`);
		if (res.status === 204) {
			console.log("polling")
			// No job — wait & poll again
			await new Promise((r) => setTimeout(r, 2000));
			return poll();
		}

		// const job = JSON.parse(res.data);
		const job = res.data;
		const jobId = job.id

		console.log("job received", job)



		// const jobArr = Object.values(job).flat()

		// console.log("[Poller] Received job:", jobArr);


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


		// jobArr.forEach(async jobItem => {

		// 	const id = jobItem.job_id;
		// 	const fnid = jobItem.fn_id
		// 	try {
		// 		const output = await executeJob(jobItem);



		// 		await axios.post(`${BASE_URL}/invocation/response/${fnid}/${id}`, {
		// 			jobId: id,
		// 			output,
		// 		});
		// 		console.log("[Poller] ✅ Sent success response");
		// 	} catch (err) {
		// 		await axios.post(`${BASE_URL}/invocation/error/${fnid}/${id}`, {
		// 			jobId: id,
		// 			error: err.message,
		// 		});
		// 		console.log("[Poller] ❌ Sent error response");
		// 	}
		// })







		// Immediately continue polling
		poll();
	} catch (err) {
		// console.error("[Poller] Poll error:", err);
		// retry after delay
		setTimeout(poll, 3000);
	}
}

poll();
