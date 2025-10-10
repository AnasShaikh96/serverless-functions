const express = require("express");

const app = express();
app.use(express.json());
const { v4: uuid4 } = require('uuid')


let pendingJob = null;

let jobQueue = [];
let pendingPromises = new Map();


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
    const jobId = uuid4()


    jobQueue.push({ id: jobId, payload: { fnId, fnName } })


    const result = await new Promise((resolve, reject) => {
        pendingPromises.set(jobId, { resolve, reject })
        setTimeout(() => {
            if (pendingPromises.has(jobId)) {
                pendingPromises.delete(jobId);
                reject(new Error('Job Timeout'))
            }
        }, 15000);

    })



    console.log("result", await result)
    res.json({
        message: "inside",
        result
    })


    // jobQueue.set(jobId, Promise {
    //     status: 'pending',
    //     jobId,
    //     fnId,
    //     fnName
    // })



    // console.log()
    // res.send({
    //     jobId,
    //     fnId, fnName
    // })



    // if (jobQueue.get(fnId) !== undefined) {
    //     jobQueue.set(fnId, [...jobQueue.get(fnId), {
    //         job_id: Math.random() * 10000,
    //         fn_id: fnId,
    //         fn_name: fnName
    //     }])
    // } else {
    //     jobQueue.set(fnId, [{
    //         job_id: Math.random() * 10000,
    //         fn_id: fnId,
    //         fn_name: fnName
    //     }])
    // }

    // res.status(200).json({
    //     jobCount: Object.fromEntries(jobQueue),
    //     message: 'Job Added successfully!'
    // })


    // pendingJob = { id: Date.now(), payload: { number: 204 } };
    // console.log("pendingJob", pendingJob)

    // res.status(200).json({
    //     jobCount: pendingJob,
    //     message: 'Job Added successfully!'
    // })

})


// Route: Node poller hits this repeatedly
app.get("/invocation/next", (req, res) => {

    if (jobQueue.length > 0) {
        const nextJob = jobQueue.shift();
        res.send(nextJob)

    } else {
        res.status(204).send() // No Job in queue
    }



    // if (jobQueue.size !== 0) {

    //     const plainObject = Object.fromEntries(jobQueue);
    //     const jsonString = JSON.stringify(plainObject)
    //     res.json(jsonString)
    // } else {
    //     res.status(204).send() //No Job if Map size is 0
    // }





    // if (pendingJob) {
    //     res.json(pendingJob);
    //     pendingJob = null; // mark as taken
    // } else {
    //     res.status(204).send(); // no job yet
    // }



});

// Response endpoints
app.post("/invocation/response", (req, res) => {

    const { jobId, output } = req.body;

    const pending = pendingPromises.get(jobId)


    if (pending) {
        pending.resolve({ status: 'success', output })
        pendingPromises.delete(jobId)
    }

    res.sendStatus(200)
    // res.status(200).json({
    //     sss: 'sss'
    // })

    // const fnId = req.params.fnid



    // const clearJob = jobQueue.get(fnId)
    // const removeJob = clearJob.filter(id => id.job_id !== jobId);
    // jobQueue.set(removeJob)

    // console.log(clearJob, fnId, jobQueue)

    // console.log("[JobServer] ✅ Success:", req.body);
    // res.sendStatus(200);
    // jobQueue.clear()



});

app.post("/invocation/error", (req, res) => {

    const { jobId, error } = req.body
    const pending = pendingPromises.get(jobId);



    if (pending) {
        pending.reject({ status: 'reject', error })
        pendingPromises.delete(jobId)
    }


    res.sendStatus(200)


    // console.log("[JobServer] ❌ Error:", req.body);
    // res.sendStatus(200);
});

app.listen(9001, () => console.log("[JobServer] Listening on port 9001"));
