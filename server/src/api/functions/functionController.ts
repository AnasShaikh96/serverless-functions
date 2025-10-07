import type { Request, Response } from "express";
import fs from "fs";
import path from "path";

import AdmZip from "adm-zip";
import { exec } from "child_process";

const dummyId = "82e5e5f7-fdd7-4b21-8573-cb00cbd9b936";

async function extractArchive(
  filepath: string,
  dirName: string,
  fnname: string
) {
  try {
    const zip = new AdmZip(filepath);
    const outputDir = dirName;
    zip.extractAllTo(outputDir);

    // console.log("filepathname", name)

    console.log(`Extracted to "${outputDir}" successfully ${zip}`);

    return outputDir + "/" + fnname;
  } catch (e) {
    console.log(`Something went wrong. ${e}`);
  }
}

export const createFunctionHandler = async (req: Request, res: Response) => {
  try {
    const userDir = `./src/executable-funcs`;
    const createDir = `./src/executable-funcs/${dummyId}`;

    // console.log("curr path", req.host)

    if (!fs.existsSync(createDir)) {
      fs.mkdirSync(createDir);
    }

    const pathUrl = await extractArchive(
      "../helloDynamic.js.zip",
      createDir,
      "helloDynamic.js"
    );

    const nodeV = '18.0.0';
    const fnName = 'index.js'

    const dockerFiletext = `
ARG NODE_VERSION=${nodeV}

FROM node:${nodeV}-alpine

ENV NODE_ENV production

WORKDIR /usr/src/app

RUN --mount=type=bind,source=package.json,target=package.json \\
    --mount=type=bind,source=package-lock.json,target=package-lock.json \\
    --mount=type=cache,target=/root/.npm \\
    npm ci --omit=dev
    
USER node

COPY . .

EXPOSE 3000

CMD node ${fnName}
    `

    const composeText = `
services:
  server:
    build:
      context: .
    environment:
      NODE_ENV: production
    ports:
      - 3000:3000
    `





    fs.writeFile(createDir + "/Dockerfile", dockerFiletext, err => {
      if (err) {
        console.log("error while creating Dockerfile", err)
      }
    })

    // fs.writeFile(createDir + '/compose.yaml', composeText, err => {
    //   console.log("error while creating compose file", err)
    // })


    const dockerCMd = `cd ${createDir} && npm init -y  && npm i && docker compose up --build`


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
      res.send('OK: Container is starting/started.');
    });


    // res.status(200).json({
    //   message: "Testing funcs",
    //   pathUrl: `http://${req.host}/generatedfunction${pathUrl?.replace(userDir, "")}`,
    // });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};
