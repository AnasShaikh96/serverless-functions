import type { Request, Response } from "express";
import { v4 as uuid4 } from "uuid";

let jobQueue: any[] = [];
let pendingPromises = new Map();

export const addJobInQueue = async (req: Request, res: Response) => {
  const fnId = req.params.id;
  const fnName = req.params.fn;
  const jobId = uuid4();

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

  res.json({
    message: "inside",
    result,
  });
};

export const jobPoller = (req: Request, res: Response) => {
  if (jobQueue.length > 0) {
    const nextJob = jobQueue.shift();
    res.send(nextJob);
  } else {
    res.status(204).send(); // No Job in queue
  }
};

export const getWorkerResponse = async (req: Request, res: Response) => {
  const { jobId, output } = req.body;

  const pending = pendingPromises.get(jobId);

  if (pending) {
    pending.resolve({ status: "success", output });
    pendingPromises.delete(jobId);
  }
  res.sendStatus(200);
};

export const getWorkerError = async (req: Request, res: Response) => {
  const { jobId, error } = req.body;
  const pending = pendingPromises.get(jobId);

  if (pending) {
    pending.reject({ status: "reject", error });
    pendingPromises.delete(jobId);
  }
  
  res.sendStatus(200);
};
