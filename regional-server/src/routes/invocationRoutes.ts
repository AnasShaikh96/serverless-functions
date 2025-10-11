import {
  addJobInQueue,
  getWorkerError,
  getWorkerResponse,
  jobPoller,
} from "../controllers/invocationController.js";
import express from "express";

const router = express.Router();

router.get("/add-jobs/:id/:fn", addJobInQueue);
router.get("/next", jobPoller);
router.post("/response", getWorkerResponse);
router.post("/error", getWorkerError);

export default router;
