const express = require("express");

const app = express();
app.use(express.json());

let pendingJob = null;

let jobQueue = new Map();


// const obj = {
//     "job-id": "uuid",
//     "fn-id": "fnId",
//     "fn-name": "fnName"
// }

// const hashMap = {
//     "fn-id": [
//         obj, obj, obj
//     ]
// }



// Simulate job creation every 10 seconds
// setInterval(() => {
//   pendingJob = { id: Date.now(), payload: { number: Math.floor(Math.random() * 10) } };
//   console.log("[JobServer] New job available:", pendingJob);
// }, 5000);


app.get('/add-jobs/:id/:fn', async (req, res) => {

    const fnId = req.params.id
    const fnName = req.params.fn


    if (jobQueue.get(fnId) !== undefined) {
        jobQueue.set(fnId, [...jobQueue.get(fnId), {
            job_id: Math.random() * 10000,
            fn_id: fnId,
            fn_name: fnName
        }])
    } else {
        jobQueue.set(fnId, [{
            job_id: Math.random() * 10000,
            fn_id: fnId,
            fn_name: fnName
        }])
    }

    res.status(200).json({
        jobCount: Object.fromEntries(jobQueue),
        message: 'Job Added successfully!'
    })







    // pendingJob = { id: Date.now(), payload: { number: 204 } };
    // console.log("pendingJob", pendingJob)

    // res.status(200).json({
    //     jobCount: pendingJob,
    //     message: 'Job Added successfully!'
    // })

})


// Route: Node poller hits this repeatedly
app.get("/invocation/next", (req, res) => {


    if (jobQueue.size !== 0) {

        const plainObject = Object.fromEntries(jobQueue);
        const jsonString = JSON.stringify(plainObject)
        res.json(jsonString)
    } else {
        res.status(204).send() //No Job if Map size is 0
    }





    // if (pendingJob) {
    //     res.json(pendingJob);
    //     pendingJob = null; // mark as taken
    // } else {
    //     res.status(204).send(); // no job yet
    // }



});

// Response endpoints
app.post("/invocation/response/:fnid/:jobid", (req, res) => {

    const jobId = req.params.jobid;
    const fnId = req.params.fnid

    const clearJob = jobQueue.get(fnId)
    // const removeJob = clearJob.filter(id => id.job_id !== jobId);
    // jobQueue.set(removeJob)

    console.log(clearJob, fnId, jobQueue)

    console.log("[JobServer] ✅ Success:", req.body);
    res.sendStatus(200);
    jobQueue.clear()
});

app.post("/invocation/error/:fnid/:jobid", (req, res) => {
    console.log("[JobServer] ❌ Error:", req.body);
    res.sendStatus(200);
});

app.listen(9001, () => console.log("[JobServer] Listening on port 9001"));
