import type { Request, Response } from "express";
import { v4 as uuid4 } from "uuid";

let jobQueue: any[] = [];
let pendingPromises = new Map();


export const addJobInQueue = async (req: Request, res: Response) => {
  try {
    const fnId = req.params.id;
    const fnName = req.params.fn;
    const jobId = uuid4();

    console.log("jobQurer in add job", jobQueue, pendingPromises)
    jobQueue.push({ id: jobId, payload: { fnId, fnName } });

    const result = await new Promise((resolve, reject) => {
      pendingPromises.set(jobId, { resolve, reject });
      setTimeout(() => {
        if (pendingPromises.has(jobId)) {
          pendingPromises.delete(jobId);
          reject(new Error("Job Timeout"));
        }
      }, 15000);
    });

    res.status(200).json({
      message: "inside",
      result,
    });
  } catch (error) {
    console.log("error in addJobInQueue", error)
    res.status(500).json({
      message: "Error occurred"
    })
  }
};

// let isPolling = false;
// export const jobPoller = async (req: Request, res) => {
//   console.log("isPolling", isPolling, req.originalUrl)

//   if (isPolling) return res.status(429).json({ message: "Queue busy" });
//   isPolling = true;

//   // console.log("isPolling", isPolling)

//   try {
//     const nextJob = jobQueue.shift();
//     if (nextJob) res.status(200).json(nextJob);
//     else res.status(204).send();
//   } finally {
//     isPolling = false;
//   }
// };


export const jobPoller = async (req: Request, res: Response) => {

  const ownerId = req.params.id
  const fnName = req.params.fn

  // Problem : Inconsistent API responses because function was assigning jobs on basis of FIRST IN
  // Solution :  Add a strict check of id and fnName

  // New Problem : Controller Chokes up if first job is not cleared
  if (jobQueue.length > 0 && jobQueue[0]?.payload?.fnId === ownerId && jobQueue[0]?.payload?.fnName === fnName) {
    console.log("inside here", ownerId)

    // console.log("jobQurer inside poller", jobQueue, pendingPromises)

    const nextJob = jobQueue.shift();
    res.status(200).send(nextJob);


  } else {

    res.status(204).send(); // No Job in queue
    // res.status(204).json('he'); // No Job in queue
  }
};

export const getWorkerResponse = async (req: Request, res: Response) => {
  const { jobId, output } = req.body;

  const pending = pendingPromises.get(jobId);

  if (pending) {
    pending.resolve({ status: "success", output });
    pendingPromises.delete(jobId);
  }
  // res.sendStatus(200);
  res.status(200).json({
    message: "Response from worker"
  })
};

export const getWorkerError = async (req: Request, res: Response) => {
  const { jobId, error } = req.body;
  const pending = pendingPromises.get(jobId);

  if (pending) {
    pending.reject({ status: "reject", error });
    pendingPromises.delete(jobId);
  }

  res.status(500).json({
    message: "Error from WorkerError"
  });
};


export const getWorkerStatus = async (req: Request, res: Response) => {
  const ownerId = req.params.id
  const fnName = req.params.fn

  const fnDir = `./src/controllers/src/function-buckets/${ownerId}/${fnName}`;

  try {

  } catch (error) {

  }


}