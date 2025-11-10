import path from "path";
import { composeText } from "../utils/composeText";
import extractArchive from "../utils/extractArchieve";
import { makeDockerFile } from "../utils/makeDockerfile";
import { exec } from "child_process";
import type { Request, Response } from "express";
import fs from "fs";
import { execa } from "execa"

import { dirname } from 'path';
import { fileURLToPath } from "url";
import { createEnv } from "../utils/createEnv";


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

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
  const { path, id, version } = req.body;

  const createDir = `./src/function-buckets/${id}`;

  // const pathUrl = await extractArchive(
  //   path.fileUrl,
  //   createDir,
  //   "helloDynamic.js"
  // );

  // const dockerFiletext = makeDockerFile(version);

  // fs.writeFile(createDir + "/Dockerfile", dockerFiletext, (err) => {
  //   if (err) {
  //     console.log("error while creating Dockerfile", err);
  //   }
  // });

  // fs.writeFile(createDir + "/compose.yaml", composeText, (err) => {
  //   console.log("error while creating compose file", err);
  // });

  // const dockerCMd = `cd ${createDir} && npm init -y  && npm i && docker compose up --build`;

  // exec(dockerCMd, (error, stdout, stderr) => {
  //   if (error) {
  //     console.error(`exec error: ${error}`);
  //     return res.status(500).send(`Error starting container: ${error.message}`);
  //   }
  //   console.log(`Container started: ${stdout}`);

  //   // You would add logic here to verify the container is truly "up"
  //   // For example, by probing a health endpoint on the newly started container,
  //   // or waiting for a specific log message.
  //   // For simplicity, we'll assume it's up after the 'docker run' command.
  //   res.send("OK: Container is starting/started.");
  // });

  const fullUrl = req.protocol + "://" + req.get("host");

  res.status(200).json({
    // functionUrl: `${fullUrl}/invoke-function/${id}${pathUrl?.replace(
    //   createDir,
    //   ""
    // )}`,
  });
};


export const initUserFunction = async (req: Request, res: Response) => {


  const { owner, fn_name, fn_zip_file, runtime } = req.body;

  // console.log("req.body", req.body)
  const createDir = `./src/function-buckets/${owner}/${fn_name}`;





  const projectDir = path.join(__dirname, createDir)
  const dockerFiletext = makeDockerFile(runtime);


  // const envContent = createEnv('http://localhost:4342/api/v1', owner, fn_name)


  // update base url to because docker use bridge network to read ports
  // of host machine which is managed by itself 
  const envContent = createEnv('http://host.docker.internal:4342/api/v1', owner, fn_name)

  const indexFileSource = path.join(__dirname, '../utils/createIndexFile.ts');
  const indexFileDestination = path.join(projectDir, 'index.js');

  const files = [
    { name: "Dockerfile", content: dockerFiletext },
    { name: "compose.yaml", content: composeText },
    { name: ".env", content: envContent }
  ]

  try {

    await execa('mkdir', ['-p', projectDir]);

    for (const file of files) {
      const filePath = path.join(projectDir, file.name);
      await fs.writeFile(filePath, file.content, (err) => {
        if (err) {
          console.log(`error in ${file.name}`)
        }
      });
      console.log('Created file:', filePath);
    }


    // copy index.js file template
    await execa('cp', [indexFileSource, indexFileDestination])


    await execa('npm', ['init', '-y'], { cwd: projectDir });
    console.log('npm init completed');


    // run normnal npm install
    await execa('npm', ['i'], { cwd: projectDir });

    // install nodemon as dependency
    await execa('npm', ['i', "nodemon", "axios", "dotenv"], { cwd: projectDir });
    console.log('dependency installed')

    //  // install nodemon as dev dependenci
    //  await execa('npm', ['i', "nodemon"], { cwd: projectDir });

    const dockerCommand = 'docker compose up --build';  // Example command
    const { stdout } = await execa(dockerCommand, { shell: true, cwd: projectDir });
    console.log('Docker command output:', stdout);


  } catch (error) {
    console.log("error while setting up project", error)
  }

  // if (!fs.existsSync(createDir)) {
  //   fs.mkdirSync(createDir, { recursive: true })
  // }


  // fs.writeFile(createDir + "/Dockerfile", dockerFiletext, (err) => {
  //   if (err) {
  //     console.log("error while creating Dockerfile", err);
  //   }
  // });

  // fs.writeFile(createDir + "/compose.yaml", composeText, (err) => {
  //   if (err) {
  //     console.log("error while creating compose file", err);
  //   }

  // });

  // fs.writeFile(createDir + "/index.js", "// init", (err) => {
  //   if (err) {
  //     console.log("err while creating init file")
  //   }
  // })


  res.status(200).json({
    success: true
  })
}


export const getUserFunction = async (req: Request, res: Response) => {
  const { owner, fn_name, fn_zip_file, runtime } = req.body;

  const fnDir = `./src/controllers/src/function-buckets/${owner}/${fn_name}`;


  // in the remote container, check if it is running
  // halt the function, cleanup from docker
  // delete the directory with everything
  // send ok response..

  console.log(fnDir, fs.existsSync(fnDir))

  if (fs.existsSync(fnDir)) {
    res.status(200).json({
      success: true,
      message: "Fucntion directory exists!"
    })
  } else {
    res.status(404).json({
      success: false,
      message: "Function directory not found or Deleted!"
    })
  }




}


export const deleteUserFunction = async (req: Request, res: Response) => {
  const fnName = req.params.fnName;
  const userId = req.params.owner;
  // const fnDir = `./src/function-buckets/${userId}/${fnName}`;
  const fnDir = `./src/controllers/src/function-buckets/${userId}/${fnName}`;

  let fnDownStatus = false;

  try {


    const dockerCommand = `docker ps --filter "ancestor=${fnName.toLowerCase()}-server" --format '{{.State}}'`
    const { stdout } = await execa(dockerCommand, { shell: true })

    // if length is greater than 0, image is running
    // run docker compose down then.
    if (stdout.length > 0) {

      // const dockerDownCommand = `docker compose down`
      const postDockerDown = await execa('docker', ['compose', 'down'], { cwd: fnDir });
      console.log("docker container halter", postDockerDown)

    }


    fnDownStatus = true

    console.log("nothing happened cause image is already down")

    // console.log("isFnRunning", dockerCommand, isFnRunning.stdout.length)


  } catch (error) {

    fnDownStatus = false
    console.log('error occured in deleteUserFunction in bucketcontroller', error)
  }


  if(fnDownStatus){

    
  }


  res.status(200).json({
    success: true,
    message: 'function deleted successfully'
  })

}