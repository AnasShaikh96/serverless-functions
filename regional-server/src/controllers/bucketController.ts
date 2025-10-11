import { composeText } from "../utils/composeText.ts";
import extractArchive from "../utils/extractArchieve.ts";
import { makeDockerFile } from "../utils/makeDockerfile.ts";
import { exec } from "child_process";
import type { Request, Response } from "express";
import fs from "fs";

export const getUserBucket = async (req: Request, res: Response) => {
  const fullUrl = req.protocol + "://" + req.get("host") + req.originalUrl;

  const userId = req.params.id;

  if (!userId) {
    res.status(500).json({
      success: false,
      message: "User Id not provided or User does not exists!",
    });
  }

  const userDir = `./src/function-buckets/${userId}`;

  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true });
    res.status(200).json({
      success: true,
      message: "new User function bucket created!",
      url: fullUrl,
    });
  }

  res.status(200).json({
    success: true,
    message: "User function bucket exists!",
  });
};

export const storeUserFunction = async (req: Request, res: Response) => {
  const path = req.body;
  const id = req.body;
  const nodeV = req.body;

  const createDir = `./src/function-buckets/${id}`;

  const pathUrl = await extractArchive(
    path.fileUrl,
    createDir,
    "helloDynamic.js"
  );

  const dockerFiletext = makeDockerFile(nodeV);

  fs.writeFile(createDir + "/Dockerfile", dockerFiletext, (err) => {
    if (err) {
      console.log("error while creating Dockerfile", err);
    }
  });

  fs.writeFile(createDir + "/compose.yaml", composeText, (err) => {
    console.log("error while creating compose file", err);
  });

  const dockerCMd = `cd ${createDir} && npm init -y  && npm i && docker compose up --build`;

  exec(dockerCMd, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send(`Error starting container: ${error.message}`);
    }
    console.log(`Container started: ${stdout}`);

    // You would add logic here to verify the container is truly "up"
    // For example, by probing a health endpoint on the newly started container,
    // or waiting for a specific log message.
    // For simplicity, we'll assume it's up after the 'docker run' command.
    res.send("OK: Container is starting/started.");
  });

  const fullUrl = req.protocol + "://" + req.get("host");

  res.status(200).json({
    functionUrl: `${fullUrl}/invoke-function/${id}${pathUrl?.replace(
      createDir,
      ""
    )}`,
  });
};
