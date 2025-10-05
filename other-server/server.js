import express from "express"
import cors from "cors"
import fs from "fs"
// import extractArchieve from "../server/src/common/utils/extractArchieve"

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }))




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


  // const path = req.body


  console.log("inside store func", path)

  // const pathUrl = await extractArchive(
  //   "../helloDynamic.js.zip",
  //   createDir,
  //   "helloDynamic.js"
  // );







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



app.listen(3000, () => {
  console.log("server up at 3000")
})