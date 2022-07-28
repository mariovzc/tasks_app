import express from "express"
import db from "./db.js"

db()

const app = express()
const port = 3000

app.get('/', (req, res) => {

  res.send("hello world")
})

app.get('/envs', (req, res) => {
  res.json(process.env)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})