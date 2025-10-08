const express = require("express")
const cors = require("cors")
const fs = require("fs")

const app = express();

app.use(cors())
app.use(express.urlencoded({ extended: true }))



app.use('/invoke/next')


app.use('/invoke/:id/response')
app.use('/invoke/:id/error')