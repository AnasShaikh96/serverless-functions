import express from "express";
import cors from "cors";
import fs from "fs";
import extractArchive from "./utils/extractArchieve.ts";
import { makeDockerFile } from "./utils/makeDockerfile.ts";
import { exec } from "child_process";
import { composeText } from "./utils/composeText.ts";

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/user-bucket/:id", (req, res) => {
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
});

app.use("/store-function", async (req, res) => {
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
});


// old method
// app.use("/invoke-function/:id/:fnname", async (req, res) => {
//   const reqMethod = req;

//   const query = req.params;
//   const fileName = req.params.fnname;
//   const fnName = fileName.replace(".js", "");

//   switch (reqMethod.method) {
//     case "GET":
//       const moduel = require(`./src/function-buckets/${query.id}/${fileName}`);

//       console.log(await moduel[`${fnName}`]);
//       await moduel[`${fnName}`](res);
//     default:
//       res.status(200).json({
//         message: "Invalid method",
//       });
//   }
// });

app.listen(port, () => {
  console.log(`server up at ${port}`);
});
