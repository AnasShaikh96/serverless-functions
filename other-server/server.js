const express = require("express")
const cors = require("cors")
const fs = require("fs")


const extractArchive = require('./extractArchieve.js')
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.use(express.json())


// app.use("/", (req, res) => {
//   res.send("hellow world")
// })


app.use("/user-bucket/:id", (req, res) => {
  const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  const userId = req.params.id

  if (!userId) {
    res.status(500).json({
      success: false,
      message: "User Id not provided or User does not exists!"
    })
  }

  const userDir = `./src/function-buckets/${userId}`;

  if (!fs.existsSync(userDir)) {
    fs.mkdirSync(userDir, { recursive: true })
    res.status(200).json({
      success: true,
      message: 'new User function bucket created!',
      url: fullUrl
    })
  }


  res.status(200).json({
    success: true,
    message: 'User function bucket exists!',
  })
})



app.use("/store-function/:id", async (req, res) => {


  const path = req.body
  const createDir = `./src/function-buckets/${req.params.id}`;
  const pathUrl = await extractArchive(
    path.fileUrl,
    createDir,
    "helloDynamic.js"
  );



  const fullUrl = req.protocol + '://' + req.get('host');

  res.status(200).json({
    functionUrl: `${fullUrl}/invoke-function/${req.params.id}${pathUrl?.replace(
      createDir,
      ""
    )}`,
  })
})


app.use("/invoke-function/:id/:fnname", async (req, res) => {
  const reqMethod = req;

  const query = req.params;
  const fileName = req.params.fnname;
  const fnName = fileName.replace(".js", "")


  switch (reqMethod.method) {
    case "GET":
      const moduel = require(`./src/function-buckets/${query.id}/${fileName}`);
      // res.send('hello')

      console.log(await moduel[`${fnName}`]);
      await moduel[`${fnName}`](res);
    default:
      res.status(200).json({
        message: "Invalid method",
      });
  }
});




app.listen(3000, () => {
  console.log("server up at 3000")
})