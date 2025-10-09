const express = require("express");

const app = express();
app.use(express.json());

let pendingJob = null;

// Simulate job creation every 10 seconds
// setInterval(() => {
//   pendingJob = { id: Date.now(), payload: { number: Math.floor(Math.random() * 10) } };
//   console.log("[JobServer] New job available:", pendingJob);
// }, 5000);


app.get('/add-jobs', async (req, res) => {

    pendingJob = { id: Date.now(), payload: { number: 204 } };
    console.log("pendingJob", pendingJob)

    res.status(200).json({
        jobCount: pendingJob,
        message: 'Job Added successfully!'
    })
})


// Route: Node poller hits this repeatedly
app.get("/invocation/next", (req, res) => {
    if (pendingJob) {
        res.json(pendingJob);
        pendingJob = null; // mark as taken
    } else {
        res.status(204).send(); // no job yet
    }
});

// Response endpoints
app.post("/invocation/response", (req, res) => {
    console.log("[JobServer] ✅ Success:", req.body);
    res.sendStatus(200);
});

app.post("/invocation/error", (req, res) => {
    console.log("[JobServer] ❌ Error:", req.body);
    res.sendStatus(200);
});

app.listen(9001, () => console.log("[JobServer] Listening on port 9001"));
