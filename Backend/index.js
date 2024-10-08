const connectToMongo = require('./db')
connectToMongo();

const express = require('express')
const app = express()
const port = 3001
const cookieParser = require ('cookie-parser')
const cors = require('cors')
const router = require('./Routes/router')

app.use(cors());
app.use(express.json());
app.use(router);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


